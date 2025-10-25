# 💍 Rayko & Anais Wedding Website

A modern, elegant wedding website built with Astro, React, UnoCSS, and Three.js to celebrate the love of Rayko Azcue Pérez and Anais Garcia Peña, and their beautiful family with Gabriel Armando (Armandito).

## ✨ Features

### 🎨 Design

- **Modern & Elegant**: Painted/artistic style with botanical accents
- **Custom Color Palette**: Cream (#FFFBF7), Gold (#D4AF37), Green (#A8B89F)
- **Responsive Design**: Mobile-first approach, optimized for all devices
- **Smooth Animations**: CSS animations and scroll-triggered effects

### 🎯 Sections

#### Home Page (`/`)

1. **Hero Section** - Immersive Three.js animated background with floating particles
2. **Timeline** - Interactive journey through relationship milestones
3. **Family Cards** - CSS-drawn illustrated portraits of Rayko, Anais, and Armandito
4. **Event Details** - Wedding date, time, location with embedded Google Maps

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.15.1
- **UI Components**: [React](https://react.dev/) v19.2.0
- **Styling**: [UnoCSS](https://unocss.dev/) with Tailwind preset
- **3D Graphics**: [Three.js](https://threejs.org/)
- **TypeScript**: Full type safety

## 📁 Project Structure

```
/
├── public/
│   ├── en/                     # English localized assets
│   ├── favicon.ico             # Fallback favicon
│   ├── favicon.svg             # Main favicon
│   ├── icons/                  # Generated favicon variants
│   └── invitation.png          # Invitation image
├── src/
│   ├── components/
│   │   ├── EventDetails.astro      # Event information card
│   │   ├── FamilyCards.tsx         # Family member portraits
│   │   ├── Footer.astro            # Site footer
│   │   ├── Header.astro            # Navigation header
│   │   ├── HeroSectionStarry.tsx   # Starry hero section
│   │   └── Timeline.tsx            # Relationship timeline
│   ├── i18n/
│   │   ├── translations.ts         # Multilingual content
│   │   └── utils.ts                # i18n utilities
│   ├── layouts/
│   │   └── MainLayout.astro        # Base page layout
│   ├── pages/
│   │   ├── en/                     # English pages
│   │   │   ├── index.astro         # English home page
│   │   │   └── invitation.astro    # English invitation page
│   │   ├── index.astro             # Home page
│   │   └── invitation.astro        # Invitation page
│   └── styles/
│       └── global.css              # Global styles & animations
├── astro.config.mjs                # Astro configuration
├── uno.config.ts                   # UnoCSS configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd my-weeding
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser to `http://localhost:4321`

## 📝 Commands

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `npm install`               | Installs dependencies                            |
| `npm run dev`               | Starts local dev server at `localhost:4321`      |
| `npm run build`             | Build your production site to `./dist/`          |
| `npm run preview`           | Preview your build locally, before deploying     |
| `npm run type-check`        | Run TypeScript type checking                     |
| `npm run lint`              | Run ESLint to check code quality                 |
| `npm run lint:fix`          | Run ESLint and automatically fix issues          |
| `npm run format`            | Format code with Prettier                        |
| `npm run format:check`      | Check code formatting with Prettier              |
| `npm run generate:favicons` | Generate PNG favicons from SVG sources           |
| `npm run astro ...`         | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`   | Get help using the Astro CLI                     |

## 🔖 Favicons with Two Stars

We provide a favicon design featuring two stars (golden and rose) under `public/icons/`:

- `favicon-twinstars-classic.svg` — Two clean, offset 5-point stars with subtle strokes

PNG variants are auto-generated for common sizes (16, 32, 180, 512):

```bash
npm run generate:favicons
```

This will emit files like `public/icons/<name>-16.png`, `-32.png`, `-180.png`, `-512.png`.

To use it as the site favicon, add a link in `src/layouts/MainLayout.astro` (or copy your choice to `public/favicon.svg`/`public/favicon.png`):

```html
<link rel="icon" type="image/svg+xml" href="/icons/favicon-twinstars-classic.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-twinstars-classic-32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/favicon-twinstars-classic-180.png" />
```

Tip: SVG favicons look crisp on all densities. Keep PNG fallbacks for older platforms and iOS touch icons.

## 🎨 Customization Guide

### 1. Update Wedding Details

Edit `src/i18n/translations.ts`:

```typescript
event: {
  title: 'Nuestro Día Especial',
  downloadInvitation: 'Descargar Invitación',
  events: [
    {
      title: 'Ceremonia Religiosa', // Your ceremony title
      date: '8 de Noviembre, 2025', // Your wedding date
      time: '4:00 PM', // Your ceremony time
      venue: 'Iglesia de la Virgen del Carmen', // Your venue name
      address: 'Calle Concha entre Cármen y Montaña, Cojimar, Habana del Este', // Your venue address
      dateLabel: 'Fecha',
      timeLabel: 'Hora',
      venueLabel: 'Lugar',
      mapUrl: 'https://...', // Google Maps embed URL
    },
    // Add reception details...
  ],
  rsvpButton: 'Confirmar Asistencia',
},
```

### 2. Update Timeline Milestones

Edit `src/i18n/translations.ts`:

```typescript
timeline: {
  title: 'Nuestro Viaje Juntos',
  subtitle: 'Cada momento nos ha llevado aquí, a este hermoso capítulo de nuestras vidas',
  milestones: [
    {
      year: '~ 2022',
      title: 'Acercándonos', // Your milestone title
      description: 'Dos estrellas moviéndose por el vasto universo...', // Your milestone description
    },
    {
      year: 'diciembre 2022',
      title: 'Nos Encontramos', // Your milestone title
      description: 'Nuestros caminos se cruzaron y nuestras luces se tocaron...', // Your milestone description
    },
    // Add your relationship milestones...
  ],
},
```

### 3. Customize Colors

Edit `uno.config.ts`:

```typescript
theme: {
  colors: {
    cream: '#FFFBF7',   // Background color
    gold: '#D4AF37',    // Accent color
    green: '#A8B89F',   // Secondary accent
    dark: '#2C2C2C',    // Text color
  },
}
```

### 4. Update Family Bios

Edit `src/i18n/translations.ts`:

```typescript
family: {
  title: 'Nuestra Familia',
  subtitle: 'Conoce a las personas que hacen este día tan especial',
  members: [
    {
      name: 'Rayko Azcue', // Family member name
      bio: 'Un compañero amoroso y padre devoto, trae alegría a cada momento...', // Family member bio
    },
    {
      name: 'Anais Garcia', // Family member name
      bio: 'Un alma hermosa con un corazón lleno de amor, crea calidez...', // Family member bio
    },
    // Update all family members...
  ],
},
```

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The production-ready site will be in the `./dist/` directory.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Astro and configure build settings
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1200px
- **Desktop**: > 1200px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Color contrast compliance
- Alt text for all images

## 🎭 Three.js Animation

The hero section features an interactive particle system:

- Gold and green floating particles
- Mouse movement interaction
- Responsive to viewport size
- Optimized for mobile performance

## 📄 License

This project is created for personal use for the wedding of Rayko & Anais.

## 💖 Credits

Designed with love for our special day.

---

**Wedding Date**: November 8, 2025  
**Built with**: Astro, React, UnoCSS, Three.js

## �👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
