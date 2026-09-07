# FrameFinder cinematic showcase

Complete seven-chapter website, preserving the supplied logo and the deployed Zalando Sans Expanded / Inter / IBM Plex Mono typography. The reference site and brand source folders are untouched.

## Run

Requires Node.js 22.12+ (tested with Node 25).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5180. Vite serves the page and embedded app; a local API on 5181 receives applications.

```sh
npm run build
npm start
```

The production server serves `dist` and the application API together on port 5180. Set `HOST=0.0.0.0` and `PORT` for hosting behind an HTTPS reverse proxy. No deployment has been performed.

## Applications

The form validates in the browser and on the server. Confirmation appears only after durable append succeeds. Requests are same-origin, size-limited, honeypot-protected and rate-limited per direct client IP. Applications are stored in `.data/applications.jsonl` (ignored by Git, directory mode 0700 and file mode 0600). Set `APPLICATIONS_FILE` to a persistent storage path on the deployed server. Keep that path outside `dist`. No email or CRM integration is configured. Review submissions directly in the restricted data file. The server does not expose a public submission-list endpoint.

For multi-instance hosting, replace the append-only file with a shared database and use edge rate limiting. Configure `PUBLIC_ORIGIN` only when a reverse proxy changes the Host header. Preserve Host by default. Avoid ephemeral hosting storage for applications.

## Source and product truth

- `framefinder-brand/BRAND.md`: logo geometry, Signal red, Ink and Daylight color roles.
- `Refrence/framefinder-deploy`: deployed typography, visual identity, and workflow patterns.
- `../Framefinder app ui/src`: actual frontend components copied into `demo/src`, isolated in an iframe. `ShowcaseDemo.tsx` adds guided demo navigation and an explicit source-reconnection simulation. The original application source is not modified.
- `../presentation/FrameFinder Proposition Validation and Competitive Due Diligence.pdf`: safer positioning and capability limitations. Both older image-based PDFs were also inspected, but unsupported comparisons were excluded.
- https://www.frame-finder.app/: reviewed for current identity and its keyframe-processing explanation.

The app uses sample data, not a connected product backend. Natural-language dimensions, footage searches, QR labels and drive reconnection on the showcase are illustrative. The real frontend itself contains prototype controls; it is not a production desktop app running in a web page. Dialogue and compound search are conceptual, not independently validated shipping capabilities. Source files remain unavailable until their drive is reconnected. No live hardware is accessed. No pricing, exclusivity or universal offline promises are made.

## Layout and motion

Main site follows the existing Vite / vanilla frontend stack, with GSAP ScrollTrigger. The copied React app is a second Vite entry at `/demo/index.html`. Full desktop motion includes a pinned nine-step app walkthrough. Mobile provides explicit step controls, a readable horizontally explorable app crop, and an expanded view. Reduced motion disables choreography and pinning.

Fonts and representative Unsplash photographs are hosted locally. Image source IDs are recorded in `ASSETS.md`. The original source frontend's catalogue images are redirected to these local samples.

## Verification

`npm run build` builds both entries. Browser checks cover desktop and mobile layouts, missing assets and script errors, sample searches, drive reconnection, the guided app, dialog keyboard behavior and application success/error paths. Test submissions must use a separate `APPLICATIONS_FILE` when testing a live production instance.

## Full app UI integration

The embedded app now boots the full `App.tsx` entry from the frontend-preview app served on port 5178, including Dashboard, drive details, Smart Search, Scenes, People, Pending Reviews, Settings, Help, language/theme settings and login/logout. The limited ShowcaseDemo wrapper is no longer mounted. A same-origin message bridge supports guided screen navigation; manual app navigation pauses scroll-driven screen changes. As in the original frontend, data and backend-only operations remain prototypes.
