# AIVIZED Website

Multi-page Next.js 14 website for AIVIZED — an AI services, automation, voice agents, and chatbots company.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework, routing, SSR/SSG |
| Tailwind CSS | Styling system |
| GSAP + ScrollTrigger | Section entrance animations, scroll-driven effects |
| Lenis | Buttery smooth scrolling (synced with GSAP ticker) |
| Framer Motion | Page transitions (AnimatePresence), component-level spring animations |
| Anime.js | Card hover micro-animations, SVG effects, number counters |
| Spline (`@splinetool/react-spline`) | 3D hero scenes on Home and About pages |
| next/font | Syne (headings) + DM Sans (body) — zero layout shift |

> **Note on Barba.js:** Barba.js requires direct DOM manipulation and doesn't integrate with React's virtual DOM or Next.js App Router routing. Framer Motion's `AnimatePresence` provides equivalent fade+slide page transitions within the React paradigm.

---

## Getting Started

### 1. Install dependencies

```bash
cd aivized-website
npm install
```

### 2. Configure environment variables

Copy `.env.local` and fill in your values:

```bash
# Already created — edit as needed
```

```env
# Replace with your Spline scene URLs (from spline.design)
NEXT_PUBLIC_SPLINE_HOME=https://prod.spline.design/your-scene/scene.splinecode
NEXT_PUBLIC_SPLINE_ABOUT=https://prod.spline.design/your-scene/scene.splinecode

# Replace with your Calendly booking link
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/aivized/discovery

# Contact form API endpoint (wire to your backend)
NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
aivized-website/
├── app/
│   ├── layout.tsx              # Root layout (fonts, Navigation, Footer, Lenis, PageTransition)
│   ├── globals.css             # Global styles, CSS vars, Tailwind base
│   ├── page.tsx                # Home (/)
│   ├── loading.tsx             # Global loading state
│   ├── not-found.tsx           # 404 page
│   ├── about/
│   │   └── page.tsx            # About (/about)
│   ├── services/
│   │   └── page.tsx            # Services (/services)
│   ├── work/
│   │   ├── page.tsx            # Work/Case Studies (/work)
│   │   └── [slug]/
│   │       └── page.tsx        # Individual case study (/work/:slug)
│   └── contact/
│       └── page.tsx            # Contact (/contact)
│
├── components/
│   ├── Navigation.tsx          # Sticky nav with mobile menu + active state
│   ├── Footer.tsx              # Site footer
│   ├── SmoothScroll.tsx        # Lenis init + GSAP sync (client)
│   ├── PageTransition.tsx      # Framer Motion AnimatePresence wrapper
│   ├── SplineScene.tsx         # Lazy-loaded Spline with WebGL fallback
│   ├── AnimatedCounter.tsx     # Anime.js-powered number counter
│   ├── home/
│   │   ├── HeroSection.tsx     # Full-screen hero with Spline + GSAP stagger
│   │   ├── ServicesOverview.tsx# 4 service cards with anime.js hover
│   │   ├── SocialProof.tsx     # Animated stat counters
│   │   ├── Testimonials.tsx    # Client quotes
│   │   └── CTASection.tsx      # Bottom CTA
│   ├── services/
│   │   └── ServiceBlock.tsx    # Expandable service block with anime.js
│   ├── work/
│   │   └── CaseStudyCard.tsx   # Case study card with animated results
│   └── contact/
│       └── ContactForm.tsx     # Validated form with anime.js focus effects
```

---

## Pages

| Route | Title | Description |
|-------|-------|-------------|
| `/` | Home | Hero + services overview + social proof + testimonials + CTA |
| `/services` | Services | 4 expandable service blocks with "how it works" details |
| `/about` | About | Story, values, timeline, team |
| `/work` | Work | 4 case study cards with animated results |
| `/work/[slug]` | Case Study | Full case study with process, results, quote |
| `/contact` | Contact | Form + Calendly booking + location info |

---

## Customization

### Spline 3D Scenes
1. Go to [spline.design](https://spline.design) and create or pick a scene
2. Export → **Viewer** and copy the `.splinecode` URL
3. Update `NEXT_PUBLIC_SPLINE_HOME` and `NEXT_PUBLIC_SPLINE_ABOUT` in `.env.local`

### Brand Colors
Update `tailwind.config.ts`:
```ts
colors: {
  navy: '#0A0E1A',
  teal: { DEFAULT: '#00D4FF' },
  coral: { DEFAULT: '#FF6B35' },
  'soft-white': '#F0F4FF',
  slate: { DEFAULT: '#1E2A3A' },
}
```

### Case Studies
Edit `app/work/page.tsx` → `caseStudies` array  
Edit `app/work/[slug]/page.tsx` → `caseStudyDetails` record

### Contact Form
Wire `components/contact/ContactForm.tsx` to your backend. Replace the `await new Promise(...)` mock with a real `fetch` call to `process.env.NEXT_PUBLIC_CONTACT_ENDPOINT`.

---

## Accessibility

- All interactive elements have `aria-label` or `aria-describedby`
- Navigation uses `aria-current="page"` for active links
- Forms use `aria-required`, `aria-invalid`, `aria-describedby` for error association
- All animations respect `prefers-reduced-motion`
- Focus rings are visible and use brand teal color

---

## Performance Notes

- Spline is lazy-loaded with `Suspense` — no blocking on initial render
- All fonts loaded via `next/font` — zero FOUT/layout shift
- Images optimized with `next/image` where applicable
- GSAP animations only run after component mount — no SSR hydration conflicts
- ScrollTrigger is properly cleaned up via `gsap.context()` + `ctx.revert()`

---

## Deployment

Deploy to Vercel (recommended):

```bash
npx vercel
```

Or build and deploy anywhere that runs Node.js:

```bash
npm run build
npm run start
```

Make sure all `NEXT_PUBLIC_*` environment variables are set in your deployment environment.
