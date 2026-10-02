# Latheesh Reddy — Portfolio

A premium, architectural-grade portfolio website for **Challa Sai Latheesh Reddy** — M.S. Construction Management at NYU Tandon School of Engineering.

Built with Next.js 16, TypeScript, Framer Motion, and a custom design system inspired by high-end architecture firm websites.

---

## Features

### Public Portfolio
- **Hero section** with parallax architectural grid, split name treatment, and scroll indicator
- **About section** with education timeline and leadership highlights
- **Experience section** with accordion-style expandable entries
- **Projects section** with category filtering, hover effects, and tool tags
- **Skills section** with tabbed categories (Tools, Competencies, Certifications)
- **Live résumé viewer** — embeds a PDF directly on the website
- **Contact form** with server-side validation

### Admin Panel (`/admin`)
- **Password-protected** login with JWT-based session management
- **Résumé management** — paste a PDF URL and it appears live on the site
- **Personal info editor** — update name, title, tagline, contact details
- **Experience editor** — add, edit, remove experiences with CRUD operations
- **Project editor** — add, edit, remove projects with tool tagging
- **Real-time save status** with visual feedback

### Design System
- **Anti-slop architecture** — no purple gradients, no centered-everything, no Inter-as-display
- **Font pairing**: Playfair Display (display) + DM Sans (body) + JetBrains Mono (labels)
- **Color palette**: Deep charcoal base with warm amber/brass accent (#c9a55c)
- **Motion**: Exponential ease-out transitions, scroll-triggered reveal animations
- **Spacing**: 4px-based scale, no arbitrary values
- **Responsive**: Mobile-first, fully tested at all breakpoints
- **Accessibility**: Semantic HTML, ARIA labels, reduced-motion support, proper focus management

---

## Quick Start

### Prerequisites
- **Node.js** 18+ (recommended: 20+)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd AntiG

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at **http://localhost:3000**.

### Admin Panel

Navigate to **http://localhost:3000/admin** to access the admin panel.

**Default password**: `L@theesh2026!SecureAdmin#Portfolio`

> ⚠️ **Change the password before deploying!** See the Security section below.

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `ADMIN_PASSWORD` | Password for the admin panel | `L@theesh2026!SecureAdmin#Portfolio` |
| `JWT_SECRET` | Secret key for JWT token signing | (built-in default) |

### Updating Resume

1. Go to `/admin` and log in
2. Click the **Résumé** tab
3. Paste the public URL of your PDF resume
   - **Google Drive**: Use `https://drive.google.com/file/d/FILE_ID/preview`
   - **Dropbox**: Change `?dl=0` to `?raw=1` in the shared link
   - **Direct link**: Any URL ending in `.pdf` works
4. Click **Save URL**
5. The résumé is now visible on the public site

### Updating Portfolio Content

1. Go to `/admin` and log in
2. Use the tabs to navigate:
   - **Personal** — Edit name, title, tagline, contact info
   - **Experience** — Add/edit/remove work experiences
   - **Projects** — Add/edit/remove projects with tools
3. Click **Save All** to persist changes

### Editing Source Data

For bulk changes or adding new skill categories, edit the source file directly:

```
src/data/portfolio.ts
```

This file contains the default data that the admin panel overrides are applied on top of.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout with fonts & SEO
│   ├── globals.css           # Complete design system
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard
│   │   └── layout.tsx        # Admin layout (noindex)
│   └── api/
│       ├── resume/route.ts   # Public résumé URL endpoint
│       ├── contact/route.ts  # Contact form handler
│       └── admin/
│           ├── login/route.ts    # Authentication
│           ├── logout/route.ts   # Session termination
│           ├── check/route.ts    # Auth status check
│           ├── resume/route.ts   # Résumé management
│           └── portfolio/route.ts # Portfolio data management
├── components/
│   ├── Navigation.tsx        # Scroll-aware nav with mobile menu
│   ├── HeroSection.tsx       # Parallax hero with architectural grid
│   ├── AboutSection.tsx      # Bio + education timeline
│   ├── ExperienceSection.tsx # Accordion-style work history
│   ├── ProjectsSection.tsx   # Filterable project cards
│   ├── SkillsSection.tsx     # Tabbed skills display
│   ├── ResumeSection.tsx     # Live PDF embed
│   ├── ContactSection.tsx    # Contact form + info
│   └── Footer.tsx            # Minimal footer
├── data/
│   └── portfolio.ts          # Default portfolio data
└── lib/
    ├── auth.ts               # JWT authentication utilities
    └── store.ts              # File-based data persistence
```

---

## Security

### Before Deploying

1. **Change the admin password**:
   ```bash
   # In .env.local
   ADMIN_PASSWORD=your-unique-strong-password
   ```

2. **Set a proper JWT secret**:
   ```bash
   # Generate a random secret
   openssl rand -base64 32
   
   # In .env.local
   JWT_SECRET=your-generated-secret
   ```

3. **Use HTTPS** in production (cookies are set with `secure: true` in production)

### Security Features
- **HTTP-only cookies** — tokens cannot be accessed by JavaScript
- **Constant-time password comparison** — prevents timing attacks
- **JWT tokens with 8h expiry** — sessions auto-expire
- **Input sanitization** — all admin inputs are validated and sanitized
- **Brute-force protection** — 1s delay on failed login attempts
- **SameSite strict** cookies — prevents CSRF attacks
- **Admin page hidden from search engines** — `robots: noindex, nofollow`
- **No sensitive data in client bundles** — all auth happens server-side

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in the Vercel dashboard:
- `ADMIN_PASSWORD`
- `JWT_SECRET`

> **Note**: For Vercel deployment, the file-based data store (`/data/`) will be ephemeral. For persistent storage, consider replacing `src/lib/store.ts` with a database adapter (e.g., Vercel KV, Supabase, or MongoDB).

### Self-Hosted

```bash
npm run build
npm start
```

The production server runs on port 3000 by default.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Framer Motion** | Animations & transitions |
| **Jose** | JWT token management (edge-compatible) |
| **Vanilla CSS** | Custom design system (no Tailwind dependency) |
| **Playfair Display** | Display typography |
| **DM Sans** | Body typography |
| **JetBrains Mono** | Code/label typography |

---

## License

This portfolio is built for Challa Sai Latheesh Reddy. Feel free to use the code structure as a template for your own portfolio.
