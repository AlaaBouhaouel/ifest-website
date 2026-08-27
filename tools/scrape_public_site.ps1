param(
    [string]$BaseUrl = "https://www.ifest-tunisia.org",
    [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\research\ifest-source-2026-08-26"),
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$OutputDirectory = [System.IO.Path]::GetFullPath($OutputDirectory)
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$unavailableLog = Join-Path $OutputDirectory "unavailable-resources.txt"

function Save-PublicResource {
    param([Parameter(Mandatory)][string]$Url)

    $uri = [Uri]$Url
    if ($uri.Host -notin @("ifest-tunisia.org", "www.ifest-tunisia.org")) {
        return
    }
    if ((Test-Path -LiteralPath $unavailableLog) -and -not $Force) {
        $knownUnavailable = Get-Content -LiteralPath $unavailableLog
        if ($knownUnavailable -contains $Url) {
            return
        }
    }

    $relativePath = $uri.AbsolutePath.TrimStart("/")
    if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = "index.html"
    } elseif (-not [System.IO.Path]::GetExtension($relativePath)) {
        $relativePath = "$relativePath.html"
    }

    $destination = Join-Path $OutputDirectory $relativePath
    $parent = Split-Path -Parent $destination
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
    if ((Test-Path -LiteralPath $destination) -and -not $Force) {
        return
    }

    & curl.exe -L --fail --silent --show-error --connect-timeout 10 --max-time 60 $Url -o $destination
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Skipped unavailable resource: $Url"
        Remove-Item -LiteralPath $destination -ErrorAction SilentlyContinue
        Add-Content -LiteralPath $unavailableLog -Value $Url
        return
    }

    Write-Host "Saved $Url"
}

$homepageUrl = "$BaseUrl/"
Save-PublicResource -Url $homepageUrl
$homepagePath = Join-Path $OutputDirectory "index.html"
if (-not (Test-Path -LiteralPath $homepagePath)) {
    throw "Unable to download $homepageUrl"
}
$homepage = Get-Content -Raw -Encoding UTF8 -LiteralPath $homepagePath

$siteUrls = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
[void]$siteUrls.Add($homepageUrl)
[void]$siteUrls.Add("$BaseUrl/user/login")
[void]$siteUrls.Add("$BaseUrl/robots.txt")
[void]$siteUrls.Add("$BaseUrl/sitemap.xml")

[regex]::Matches($homepage, '(?:href|src)=["''](?<url>[^"'']+)["'']') | ForEach-Object {
    $value = $_.Groups["url"].Value
    if ($value.StartsWith("/")) {
        [void]$siteUrls.Add("$BaseUrl$value")
    } elseif ($value.StartsWith($BaseUrl, [StringComparison]::OrdinalIgnoreCase)) {
        [void]$siteUrls.Add($value)
    }
}

foreach ($url in $siteUrls) {
    if ($url -ne $homepageUrl) {
        Save-PublicResource -Url $url
    }
}

$htmlPages = @(
    @{ Path = $homepagePath; Url = $homepageUrl },
    @{ Path = (Join-Path $OutputDirectory "user\login.html"); Url = "$BaseUrl/user/login" }
)

foreach ($page in $htmlPages) {
    if (-not (Test-Path -LiteralPath $page.Path)) {
        continue
    }

    $pageHtml = Get-Content -Raw -Encoding UTF8 -LiteralPath $page.Path
    [regex]::Matches($pageHtml, '(?:href|src)=["'']?(?<url>[^\s>"'']+)') | ForEach-Object {
        $value = $_.Groups["url"].Value
        if ($value.StartsWith("#") -or $value.StartsWith("mailto:") -or $value.StartsWith("javascript:")) {
            return
        }

        try {
            $absoluteUrl = [Uri]::new([Uri]$page.Url, $value).AbsoluteUri
            Save-PublicResource -Url $absoluteUrl
        } catch {
            Write-Warning "Skipped malformed resource URL: $value"
        }
    }
}

Get-ChildItem -LiteralPath $OutputDirectory -Recurse -File -Filter "*.css" | ForEach-Object {
    $cssFile = $_
    $outputUri = [Uri]($OutputDirectory.TrimEnd("\") + "\")
    $relativeCssPath = [Uri]::UnescapeDataString($outputUri.MakeRelativeUri([Uri]$cssFile.FullName).ToString())
    $cssUrl = "$BaseUrl/$relativeCssPath"
    $css = Get-Content -Raw -Encoding UTF8 -LiteralPath $cssFile.FullName
    [regex]::Matches($css, 'url\(["'']?(?<url>[^)"'']+)["'']?\)') | ForEach-Object {
        $value = $_.Groups["url"].Value.Trim()
        if (-not $value.StartsWith("data:")) {
            Save-PublicResource -Url ([Uri]::new([Uri]$cssUrl, $value).AbsoluteUri)
        }
    }
}

Get-ChildItem -LiteralPath $OutputDirectory -Recurse -File -Filter "*.html" | ForEach-Object {
    $htmlFile = $_.FullName
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $htmlFile
    $html = $html -replace '(<meta\s+name=["''](?:_token|csrf-token)["'']\s+content=["''])[^"'']+(["''])', '$1[redacted-transient-csrf-token]$2'
    $html = $html -replace '(<input\s+type=["'']hidden["'']\s+name=["'']_token["'']\s+value=["''])[^"'']+(["''])', '$1[redacted-transient-csrf-token]$2'
    $html = $html -replace '(\bvar\s+token\s*=\s*["''])[^"'']+(["''])', '$1[redacted-transient-csrf-token]$2'
    Set-Content -LiteralPath $htmlFile -Value $html -Encoding UTF8
}

$outputUri = [Uri]($OutputDirectory.TrimEnd("\") + "\")
$manifestPath = Join-Path $OutputDirectory "archive-manifest.csv"
Get-ChildItem -LiteralPath $OutputDirectory -Recurse -File |
    Where-Object FullName -ne $manifestPath |
    ForEach-Object {
        [PSCustomObject]@{
            Path = [Uri]::UnescapeDataString($outputUri.MakeRelativeUri([Uri]$_.FullName).ToString())
            Bytes = $_.Length
            SHA256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash
        }
    } |
    Sort-Object Path |
    Export-Csv -NoTypeInformation -Encoding UTF8 -LiteralPath $manifestPath

Write-Host "Public archive saved to $OutputDirectory"
