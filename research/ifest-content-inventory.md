# IFEST Tunisia public-site content inventory

Captured on 2026-08-26 from <https://www.ifest-tunisia.org/> for a website redesign.

## Archive scope

- Public homepage and login-page HTML
- Site-owned CSS, JavaScript, fonts, logos, category imagery, gallery imagery, venue imagery, Tunisia imagery, and desert-tour imagery
- Eight public robotics rules PDFs and the affiliation form document
- `robots.txt` and a list of unavailable/broken resources
- Anonymous CSRF values were redacted because they are transient implementation data, not redesign content
- No forms were submitted and no authenticated, personal, admin, or database data was accessed

Archive: `ifest-source-2026-08-26/`

## Current public facts

- Brand: I-FEST²
- Expanded name: International Festival of Engineering Science and Technology in Tunisia
- Positioning: “One Of The Biggest International Science Fair In Africa”
- Organizer: ATAST — Tunisian Association for the Future of Sciences and Technology
- Audience: students aged 14–24; robotics copy separately says ages 6–25
- Advertised duration: nine days
- Advertised dates: 23–29 March 2026
- Nomad Tours extra trip: 29–31 March 2026
- Hero location: “TBA Luxury Hotel, Tunisia”
- Venue section: Mahdia Palace Thalasso, Mahdia
- Registration state shown: “2026 Registration Is Open”
- Affiliate registration state shown: open
- Contact address: ATAST BP42 Moknine, 5050 Monastir, Tunisia
- Phone: +216 29 535 631
- General email: info.atast@gmail.com
- STEAM email: steam@ifest-tunisia.org

Important: the advertised March 2026 dates are already past as of the capture date. Registration status, dates, venue, age rules, and contact details must be reconfirmed before launch.

## Existing information architecture

The public website is predominantly one long homepage with anchor navigation:

1. Hero and registration calls to action
2. About I-FEST²
3. Gallery
4. Project categories
5. STEAM Congress
6. Open Robotics Olympiad
7. Organizers
8. About Tunisia
9. Venue
10. Nomad Tours desert extra trip
11. Participant registration modal
12. Affiliate-registration modal
13. Footer/contact information

Separate public route:

- `/user/login` — email/password login form

## Project categories

1. Physical Science
2. Environmental Science
3. Social Science
4. Computer Science
5. Engineering
6. Life & Biology
7. Multimedia
8. Mathematics

Each category has a dedicated image and a descriptive paragraph in the archived homepage.

## Program content

### I-FEST²

The site describes a nine-day educational and cultural experience with projects, activities, discoveries, trips, and excursions around Tunisia.

### STEAM Congress

- Audience: 150 teachers, educators, and organization leaders
- Components: conference, workshops organized around four axes, and STEAM Teachers Contest
- Participants prepare an educational lesson for a jury
- Lesson scripts are sent to `steam@ifest-tunisia.org`

The four workshop axes are mentioned but not named on the current page; this content is incomplete.

### Open Robotics Olympiad (ORO)

- Advertised ages: 6–25
- Four age/category groupings are mentioned but not defined on the page
- Competition names in homepage copy: SUMO Challenge, Line Follower Challenge, VEX Challenges, All-Terrain, and AI Challenge
- Additional downloadable rules expose Junior Challenge, Maze Challenge, Turning Point VEX, and Next Level VEX
- Winners are described as being determined through accumulated points, including an overall ORO trophy

### Organizers

- ATAST history begins as a school club in 2007 and states official association establishment in 2011
- I-FEST² is said to have begun in August 2014
- ATAST activities named: TUNIBRICO, Be A Teacher for a While (BAT), Spelling, Science Through My Cam, Science and Technology Camp (STC), and Tunisian Science and Engineering Festival (TSEF)
- Co-organizer: MILSET Africa
- Co-organizer: BRISECC

### Tunisia and extra trip

The page contains long-form copy covering Tunisia’s geography, history, climate, coastline, Atlas Mountains, Sahara, and international affiliations. The extra-trip copy promotes Tozeur, Matmata, Douz, Star Wars filming locations, Sahara visits, camel rides, astronomy, wildlife, mountains, and waterfalls. It states that the trip is not included in base event fees and has limited availability.

## Public forms and data fields

### Participant registration

- Participation type: Student, Supervisor, or Guest
- First name
- Last name
- Date of birth
- Email
- Phone number
- Gender: Male, Female, or Other
- T-shirt size: XS–XXL
- Country
- School/organization
- ATAST Special Award winner: Yes/No
- ATAST affiliate: Yes/No
- Joining Nomad Tours: Yes/No
- Password and show-password control

The page instructs students and supervisors to register separately.

### Affiliate registration

- Fair name
- Country
- Contact-person name
- Contact-person position
- Contact email
- Contact phone
- Affiliation or reaffiliation
- Separate downloadable form, which users are instructed to email to `info.atast@gmail.com`

### Login

- Email
- Password

For the redesign, consent/privacy language, required-field indicators, validation, password rules, accessibility, data-retention policy, and success/error states need explicit product decisions; they are not adequately communicated in the public markup.

## Downloadable documents

- `affiliation_i-fest.doc`
- `AiChallenge.pdf`
- `JuniorChallenge.pdf`
- `LineFollowerChallenge.pdf`
- `MazeChallenge.pdf`
- `NextLevelVEX.pdf`
- `SumoChallenge.pdf`
- `TerrainChallenge.pdf`
- `TurningPointVEX.pdf`

## External links and embeds

- IFEST Facebook: <https://www.facebook.com/IFEST.TUNISIA/>
- ATAST Facebook: <https://www.facebook.com/ATASTpage/>
- Promotional YouTube video: <https://www.youtube.com/watch?v=Qpa_w866Rtg>
- Venue site: <https://www.hotelpalace.com.tn/fr>
- Google Maps embed for Mahdia Palace Thalasso
- Google Fonts: Open Sans and Raleway on the homepage; Poppins on login
- Alpine.js, Font Awesome, and DataTables assets from third-party CDNs

No active Instagram, X/Twitter, LinkedIn, or TikTok destination is exposed in the captured homepage.

## Existing visual system

- Primary accent: `#f82249` / darker hover `#e0072f`
- Dark navy surfaces: approximately `#060c22`, `#0d1429`, `#101522`, and `#040919`
- Homepage typography: Open Sans for body text and Raleway for display text
- Repeated full-width photographic backgrounds with dark overlays
- Image-heavy galleries, category cards, venue carousel, and modal registration flow
- Legacy Bootstrap-era styling and Font Awesome 4 icon font on the homepage

## Content and technical cleanup required

- Event dates and “registration open” messaging are stale as of 2026-08-26
- Location conflicts: hero says TBA while venue content identifies Mahdia Palace
- Event says it lasts nine days, but the displayed main dates span seven calendar days
- Audience ages conflict between general event and robotics content
- STEAM’s four workshop axes and robotics’ four categories are not actually listed
- Several descriptions have grammar, spelling, capitalization, and punctuation issues
- Metadata description and keywords are empty
- Many images use generic alt text such as “Speaker 1” or “Speaker 3”
- Homepage references missing `timer.js`, `preloader.svg`, and `contactform/contactform.js`
- Login references missing old dashboard demo/favicon assets
- CSS references missing legacy date-picker GIFs and one Nucleo SVG font
- No sitemap is published; `robots.txt` allows crawling but is otherwise empty
- Inline scripts, duplicated libraries, legacy jQuery plugins, and mixed visual systems should not be carried into the redesign without review
- Registration and affiliate forms are embedded in the homepage rather than presented as clear, dedicated task flows
- The affiliation flow combines an online form with a document/email workflow, creating unclear duplication

## Recommended redesign content model

- `Event`: edition, status, dates, deadline, confirmed venue, age eligibility, fees, capacity, and registration URLs
- `Program`: overview, schedule, activities, excursions, and downloadable guide
- `Category`: name, summary, eligibility, judging criteria, rules, and image
- `Competition`: divisions, age bands, rules version, equipment, scoring, and document
- `Organization`: name, role, description, logo, and external URL
- `Venue`: confirmed status, hotel, address, map, accessibility, travel, and accommodation
- `Tour`: dates, inclusions, exclusions, price, capacity, safety, and registration status
- `Contact`: purpose, email, phone, address, and response expectations
- `Media`: image, accurate alt text, caption, year, photographer/rights, and focal point
- `Document`: title, type, edition/year, version, language, file, and last-updated date

This model separates facts that change every edition from evergreen organizational content and prevents stale dates or venue details from being buried inside templates.
