# Adem Eren Frontend

Next.js website and admin panel for Adem Eren Decoration.

## Run Locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel

The catalog manager is available at `/admin`.

Set the frontend environment before deploying:

```bash
ADMIN_PASSWORD=change-this-before-deploy
BACKEND_URL=https://your-backend-domain.com
BACKEND_ADMIN_TOKEN=same-token-as-backend
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.com
```

Without `ADMIN_PASSWORD`, the local starter password is `ademeren-admin`.

The product API lives in the separate `ademerenback/` project. Run it locally with:

```bash
cd ../ademerenback
npm run dev
```

Without `BACKEND_URL`, the frontend falls back to local file storage for
development. With `BACKEND_URL`, public catalog pages and the admin panel use
the backend API.

For Vercel, set the project root directory to `ademerenfront`.
