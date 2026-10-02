# Premium Birthday Surprise

A mobile-first, cinematic birthday website built with React + Vite, Tailwind CSS, GSAP, Framer Motion, Three.js / React Three Fiber, and Lucide icons.

## Quick setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Personalize it

Almost everything you need to change is in:

`src/config/siteConfig.js`

Update:

- `girlfriendName`
- `birthdayDate`
- `pin`
- `senderName`
- `heroMessage`
- `letter`
- memory captions
- appreciation messages
- quiz questions
- image mappings
- music / voice file paths

### Photos

The supplied photos are already copied to `public/images/` and mapped from one central configuration object. No photo is intentionally blurred.

### Music and voice note

Put local audio files in `public/audio/` and set, for example:

```js
audioFile: '/audio/song.mp3'
```

If a music or voice file path is empty, that section hides cleanly instead of showing a broken player.

## Privacy

The project includes:

```html
<meta name="robots" content="noindex,nofollow" />
```

There is no analytics integration and no backend. Photos stay local to the project.

## PIN note

The PIN is a personal surprise gate only. Because this is a frontend-only site, it is not secure authentication and can be found by someone inspecting the source bundle.

## Vercel

This is a standard Vite project. Import the repository into Vercel and use the defaults:

- Build command: `npm run build`
- Output directory: `dist`

## Performance

- hero/critical images preload through the opening loader
- most photos use lazy loading
- the Three.js cake is lazy-loaded as a separate chunk
- device pixel ratio is capped for the 3D scene
- animations respect `prefers-reduced-motion`
- no audio autoplays

## Main experience

Loading → PIN lock → cinematic intro → hero/countdown → timeline → fullscreen gallery → draggable polaroids → appreciation cards → quiz → scratch card → gift reveal → letter → optional audio → interactive cake → scroll collage → finale/replay → hidden five-tap star Easter egg.
