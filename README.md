# Notion Hero

A responsive Notion-inspired AI workspace homepage built with React, TypeScript, and Vite.

## Features

- Sticky responsive navigation with dropdown menus and mobile navigation.
- Hero section with rotating word animation, local looping video, and floating icons.
- AI feature cards using the numbered artwork in `public/`.
- Agent workflow cards with colored image badges.
- Trusted-team cards with founder portraits and brand marks.
- Responsive brand wall, CTA section, and expanded footer.

## Requirements

- Node.js 18 or newer
- npm

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Project Structure

```text
src/App.tsx      Main page markup and interactions
src/App.css      Page layout, responsive styles, and animations
src/index.css    Global styles and resets
public/          Local videos, logos, illustrations, and portraits
```

The page uses local assets from `public/` so the main visual content works without external image services. See [DECISIONS.md](DECISIONS.md) for implementation trade-offs and AI usage notes.

## Validation

Run both checks before sharing changes:

```bash
npm run build
npm run lint
```
