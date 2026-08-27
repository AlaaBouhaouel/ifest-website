# I-FEST website

## Deploy on Railway

1. Push this repository to GitHub and create a Railway project from it.
2. Add a PostgreSQL service to the Railway project.
3. In the web service, add a reference variable named `DATABASE_URL` with the value `${{Postgres.DATABASE_URL}}`.
4. Add these web-service variables:

   ```text
   DEBUG=False
   SECRET_KEY=<a-long-random-secret>
   ```

   Generate the secret locally with:

   ```powershell
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

5. In **Settings → Networking**, generate a public domain and deploy.

Railway detects `requirements.txt` and the `Procfile`. On each deployment the start command applies migrations, gathers static assets, and starts Gunicorn on Railway's assigned port.

For a custom domain, add it to `ALLOWED_HOSTS` as a comma-separated value. Example:

```text
ALLOWED_HOSTS=ifest-tunisia.org,www.ifest-tunisia.org
```

Keep `.env` local and never commit its real secrets. Use `.env.example` only as a template.
