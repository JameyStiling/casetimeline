# Case Timeline Builder

An interactive AI-powered case timeline extraction tool. Users can upload case notes, text logs, or legal documents to automatically extract, catalog, and chronologically order timeline facts with associated source citations.

## Project Structure

- **`client/`**: React and TypeScript frontend built with Vite and styled using Tailwind CSS v4.
- **`server/`**: Express and Node.js API server built with TypeScript, Zod validations, Pino logs, and Helmet security.
- **`.agent/` / `GEMINI.md`**: Persisted agent rules and guidelines files.

## Running Locally

To run both client and server concurrently in development mode:

```bash
# Install root dependencies
npm install

# Run concurrently
npm run dev
```

The frontend will start at `http://localhost:5173/` and the backend will start at `http://localhost:3001/`.

## Deployment

### Option A: Render Blueprints (Full-Stack in One Click)

This repository includes a `render.yaml` Blueprint definition file. To deploy both the static client and the Express backend to Render:
1. Go to your **Render Dashboard** and select **Blueprints**.
2. Connect this GitHub repository.
3. Render will auto-detect `render.yaml` and configure both services (Web Service for API, Static Site for Client).
4. Click **Apply**.
5. Once deployed, set your `GEMINI_API_KEY` environment variable in the `case-timeline-api` service settings.

### Option B: Vercel (Frontend) & Railway/Render (Backend)

For optimal user experience and page speed, host the frontend on Vercel and the backend on Railway or Render.

#### 1. Backend Deployment (Railway or Render)
- Select the `server/` directory as the root.
- Set Build Command: `npm install && npm run build`
- Set Start Command: `npm run start`
- Add environment variables:
  - `PORT`: `3001`
  - `GEMINI_API_KEY`: (Your Google Gemini API Key)

#### 2. Frontend Deployment (Vercel)
- Create a new project in Vercel and import this repository.
- Under **Project Settings**, set **Root Directory** to `client`.
- Vercel will auto-detect Vite.
- Add an Environment Variable:
  - `VITE_API_URL`: (Paste the URL of your deployed backend)
- Click **Deploy**.

