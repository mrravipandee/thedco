# THE DCO — Premium Hospitality Advisory

A production-ready, high-end cinematic website designed and built for **THE DCO**, a luxury hospitality advisory firm. THE DCO delivers bespoke strategy, operational auditing, and concept-to-launch support for elite hotels, resorts, fine-dining restaurants, and food service businesses.

---

## 🏛️ Brand Identity & Aesthetics

THE DCO interface is built with an elegant, editorial, and minimal style closer to premium architecture portfolios and high-end design magazines than ordinary SaaS products.

* **Primary Accent (Gold)**: `#C9A24A` (Used sparingly for refined details, borders, and active highlights)
* **Dark Mode Core**: `#000000` (Prevalent canvas background)
* **Typography**:
  - **Display / Headings**: `Cormorant Garamond` (Elegant, traditional editorial serif)
  - **Body / Interfaces**: `Manrope` (Clean, legible geometric sans-serif)

---

## ⚡ Tech Stack

* **Core**: Next.js (App Router, React 19) + TypeScript
* **Styling**: Tailwind CSS v4 (incorporating `@theme` variables inside `globals.css`)
* **State Management**: Zustand
* **Database**: MongoDB + Mongoose ODM (incorporating serverless connection caching)
* **Validation**: React Hook Form + Zod
* **Animation Suite**:
  - **GSAP (GreenSock)** & `@gsap/react` for advanced timelines and ScrollTrigger scrolling progressions.
  - **Motion (Framer Motion)** for staggered mobile menu entry, page overlays, buttons, and micro-hover states.
  - **Lenis** for smooth scroll damping.
* **Asset Loading**: Optimized layouts utilizing `next/image` with custom clip-mask reveal containers.

---

## 📂 Project Architecture

```
public/
  images/
    hero/           # Cinematic background images
    services/       # Section service details
    general/        # Layout and branding visual assets

src/
  app/              # Next.js App Router Page layouts
    about/
    services/
    projects/
    contact/
    api/            # Dynamic route endpoints
      contact/
      enquiries/
      projects/

  components/       # Reusable layout and ui units
    ui/             # Button, MagneticButton, Container, etc.
    layout/         # Translucent Navbar, MobileMenu, Footer
    home/           # Section modules (S1 - S8)
    animations/     # GSAP & Motion reveal primitives
    forms/          # Form validations and loaders

  lib/              # Mongoose DB config, utility CN hooks, validations
  models/           # Mongoose Database models (Project, Enquiry, etc.)
  store/            # Zustand global state stores
  hooks/            # useMediaQuery, useReducedMotion hooks
  data/             # Navigation links, services configs
  types/            # TS shared interface configurations
  config/           # Site configuration and constructMetadata SEO helper
```

---

## ⚙️ Getting Started

### 1. Installation

Install all required production dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```env
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

Your local build is now available at [http://localhost:3000](http://localhost:3000) (or the port indicated in the terminal log).

---

## 🧱 Production Compilation & QA

To ensure the build satisfies static optimization parameters and runs without warnings, verify using:

```bash
# Verify TypeScript Type Safety
npx tsc --noEmit

# Verify ESLint rules
npm run lint

# Compile optimized server build
npm run build
```

---

## ♿ Accessibility & Performance

* **Prefers Reduced Motion**: When system settings dictate reduced motion, the primitive timeline hooks automatically scale animation durations to `0` and fallback to simple instant opacity states.
* **LCP & CLS Targets**: Dynamic images use Next.js `next/image` sizes to ensure responsive layout shift metrics remain under standard Google Core Web Vitals parameters.
