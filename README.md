# DEVCAPI LTD — Website

**Capital Advisory for Luxury Real Estate Development**

A production-ready static website for DEVCAPI LTD. Built with semantic HTML5, vanilla CSS, and JavaScript. Zero dependencies. Deployable to Vercel in one click.

---

## Project Structure

```
devcapi/
├── index.html          # Main HTML (single page)
├── css/
│   └── styles.css      # All styles — dark luxury aesthetic
├── js/
│   └── main.js         # Scroll animations, nav, form handling
├── vercel.json         # Vercel deployment config
└── README.md
```

---

## Features

- **Full responsive design** — mobile, tablet, desktop
- **Scroll-reveal animations** via IntersectionObserver
- **Sticky nav** with scroll-aware behavior & mobile hamburger menu
- **Hero parallax** effect
- **Animated number counters** on engagement amounts
- **Contact form** with client-side validation and success state
- **Security headers** via `vercel.json`
- **No build step required** — pure static

---

## Deployment

### Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects static — click **Deploy**

That's it. No configuration needed.

### Manual / GitHub Pages

1. Go to **Settings → Pages** in your GitHub repo
2. Set source to `main` branch, `/ (root)` folder
3. Save — your site will be live at `https://yourusername.github.io/devcapi`

---

## Customization Checklist

Before launch, update the following placeholders:

- [ ] `[Address]`, `[City, State, ZIP]` — firm address in footer
- [ ] `[Email]`, `[Phone]` — contact details in footer
- [ ] `Name Surname` → Real principal names in Principals section
- [ ] Principal biographies — replace placeholder text
- [ ] `[Redacted Case Study]` labels → confirm or expand engagement data
- [ ] Contact form `action` → wire to Formspree, Netlify Forms, or your backend
- [ ] `og:image` meta tag → add a preview image (1200×630px)
- [ ] Favicon → add `<link rel="icon">` in `<head>`
- [ ] Google Analytics → add GA4 snippet before `</body>`
- [ ] Privacy Policy & Terms of Use pages

---

## Contact Form Integration

The form currently simulates submission. To wire it to a real backend:

**Option A — Formspree (easiest):**
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B — Netlify Forms:**
Add `netlify` attribute: `<form class="contact-form" netlify>`

**Option C — Custom API:**
Replace the `simulateSubmit()` call in `js/main.js` with a real `fetch()` POST.

---

## Brand

- **Voice:** Luxury, Conversational, Empathetic
- **Values:** Ethics, Innovation, Care, Sustainability
- **Fonts:** Cormorant Garamond (display), Crimson Pro (body), Cinzel (labels)
- **Colors:** Deep black `#080807`, warm cream `#f2ede3`, muted gold `#c4a456`

---

© 2026 Devcapi Ltd. All rights reserved.
