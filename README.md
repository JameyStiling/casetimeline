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
