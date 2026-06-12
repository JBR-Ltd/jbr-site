# JBR Limited — Corporate Website

The official website for JBR Limited, a technology company building enduring
products across Africa. Built with Next.js, TypeScript, Tailwind CSS v4, Three.js,
and Framer Motion.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — 3D scenes
- **Framer Motion** — animations and scroll-driven transitions
- **Lenis** — smooth scrolling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          → Home
│   ├── about/             → About page
│   ├── services/          → Services page
│   ├── ventures/          → Ventures page
│   ├── contact/           → Contact page
│   ├── layout.tsx         → Root layout (navbar, footer, loader, 3D scene)
│   └── globals.css        → Theme, colors, fonts (Tailwind v4 @theme)
├── components/
│   ├── layout/             → Navbar, Footer
│   ├── sections/           → Home page sections
│   ├── three/              → 3D scene (ArchScene, GlobalScene)
│   └── ui/                 → Reusable UI (Loader, TeamCard, FadeIn, TextReveal, Cursor)
└── hooks/
    └── useLenis.ts          → Smooth scroll hook
```

## Brand Assets

Place these in `public/`:

| File | Used for |
|---|---|
| `logo.png` | Navbar, footer, loading screen |
| `rello.png` | Rello platform logo (Ventures section) |
| `rello.jpeg` | Rello platform background image (Ventures section) |
| `team/*.jpg` | Team member photos (About page) |

## Customization

- **Colors & fonts** — edit the `@theme` block in `src/app/globals.css`
- **Team members** — edit the `team` array in `src/app/about/page.tsx`
- **3D scene** — tweak shapes, colors, and scroll behavior in `src/components/three/ArchScene.tsx`
- **Loader** — first-load animation lives in `src/components/ui/Loader.tsx` (uses `sessionStorage` to show once per session)

## Live site
[website link](https://www.example.com)