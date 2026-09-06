# FrameFinder — Brand Specification

> **Status:** Authoritative. Supersedes the previous `docs/BRAND.md` in full.
> **Accent system:** Red (`Signal`). Tungsten is retired.
> **Audience:** Design + dev. Every value here is implementable as written.
> **Last updated:** 2026-08-18

---

## 0. What changed from the previous version

| Previous | Now | Why |
|---|---|---|
| Three accent systems (blue `#0A84FF`, indigo `#6366F1`, red `#FF0000`) | One: **Signal** red ramp | The three never agreed |
| Tungsten `#E09A44` as primary accent | Retired | Owner approved red |
| `#FF0000` used as the UI accent | `#FF0000` is the **brand** colour; UI draws from Signal 400 / 600 | `#FF0000` measures 4.93:1 on Ink 950 and 3.47:1 on Card — fails AA at 10–12 px, which is exactly where timecode and confidence figures live |
| Knockout on red used dark type | **Anything on a red field is white.** No exceptions | Brand rule. Logotypes are exempt from WCAG 1.4.3 contrast requirements; dark-on-red also reads as harsh rather than premium |
| `Logo.tsx` renders the full lockup at sm/md/lg | `sm` (24 px) renders the **symbol only** | The wordmark's 45° terminals collapse below 32 px |
| `accent-amber` / `--ff-accent-orange` as warning colours | Mapped to Daylight | Amber beside red reads as a second accent competing with the brand |
| Open questions in §4 | Resolved | See §1 |

---

## 1. The accent decision

`#FF0000` is the brand colour and does not change. But a single hex cannot serve both the logo and the interface, so the system is a **ramp built around it**:

| Token | Hex | Role | On Ink 950 | On Card |
|---|---|---|---|---|
| Signal 100 | `#FFE4E1` | Tint fills | 16.4:1 | 1.05:1 |
| Signal 300 | `#FF9C94` | Text on dark, hover | 9.8:1 | 1.75:1 |
| Signal 400 | `#FF5A4F` | **UI accent on dark** | **6.4:1** | 2.67:1 |
| Signal 500 | `#FF0000` | **Brand red** — logo, app icon, large fills, playhead | 4.93:1 | 3.47:1 |
| Signal 600 | `#CC0000` | **UI accent on light**, pressed on dark | 3.35:1 | **5.11:1** |
| Signal 700 | `#8F1410` | Deep fills where white knocks out (9.2:1) | 2.13:1 | 8.02:1 |

**Rules**

- **Anything placed on a Signal field is white** — the mark, the wordmark, UI labels, everything. Dark type is never set on red.
- White on Signal 500 measures 4.0:1 — fine for the logo and for large text (AA large is 3:1), not for small UI text. Where small text must sit on a red field, use **Signal 700 `#8F1410`**, which gives white **9.2:1**. Signal 600 gives white 5.9:1.
- Signal 500 is never used for text below 18 px.
- Signal 500 never outlines a result thumbnail. In video software red means REC or error — a red frame outline reads as "recording" or "problem" before it reads as "found". The found state uses a **light 1 px rule plus the bracket reticle**.
- Signal exceeding ~8 % of a composition means the layout is wrong. Reduce the accent; do not dilute it.

---

## 2. Colour

### 2.1 Ink — neutral scale

| Step | Hex | Usage |
|---|---|---|
| Ink 950 | `#0A0B0C` | Darkest background, theme colour |
| Ink 900 | `#111315` | Primary surface |
| Ink 850 | `#16191C` | Elevated surface |
| Ink 800 | `#1D2125` | Borders, dividers |
| Ink 700 | `#2A2F34` | Strong borders |
| Ink 600 | `#3B4248` | — |
| Ink 500 | `#565E66` | Meta text, labels |
| Ink 400 | `#7C858D` | Secondary text, disabled |
| Ink 300 | `#A6AEB5` | Body text |
| Ink 200 | `#CDD3D8` | Body text (alt) |
| Ink 100 | `#E6EAEC` | Primary text on dark |
| Card | `#EFEFED` | Light surfaces, print, labels |

### 2.2 Daylight — the system voice

| Step | Hex | Usage |
|---|---|---|
| Daylight 300 | `#A7C4E6` | Light tint |
| Daylight 400 | `#7FA6D6` | Hover |
| Daylight 500 | `#5D87BC` | Links, metadata, drive & QR system, AI reasoning text |
| Daylight 600 | `#43678F` | Pressed |

Daylight is informational. It never appears on success states or on the primary CTA. Signal and Daylight never share an element.

### 2.3 Semantic — face review only

| Token | Hex |
|---|---|
| Confirmed | `#4E9C6B` |
| Rejected | `#B85C4F` |

Locked to the face-review Y/N flow. General error states use Signal 400 on dark, Signal 600 on light — not Rejected.

### 2.4 Print & material

| Colour | HEX | CMYK | Pantone | RAL |
|---|---|---|---|---|
| Ink 950 | `#0A0B0C` | 0/0/0/100 | Black 6 C | 9005 |
| Card | `#EFEFED` | 0/0/2/3 | Cool Gray 1 C | 9003 |
| Signal 400 | `#FF5A4F` | 0/78/68/0 | 178 C | 2002 |
| Signal 500 | `#FF0000` | 0/100/100/0 | Red 032 C | 3020 |
| Signal 600 | `#CC0000` | 0/100/100/20 | 1795 C | 3020 |
| Signal 700 | `#8F1410` | 18/100/100/40 | 1815 C | 3009 |
| Daylight 500 | `#5D87BC` | 62/33/0/12 | 2151 C | 5024 |

Pantone and RAL are nearest visual matches — proof on the final substrate before any run.

### 2.5 Distribution budget

| Surface | Share |
|---|---|
| Ink | 70 % |
| Card | 18 % |
| Signal | 8 % |
| Daylight | 4 % |

Unchanged from the previous spec, but it matters more now: red at 8 % reads considerably louder than tungsten at 8 %.

---

## 3. Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display & text (Latin) | **Inter** | 300 / 400 / 500 / 600 | Licensed upgrade: Suisse Int'l |
| Data | **IBM Plex Mono** | 400 / 500 | Tabular figures. Upgrade: ABC Diatype Mono |
| Arabic | **IBM Plex Sans Arabic** | 300 / 400 / 500 / 600 | Set +1 to +2 pt against Latin at the same optical size |

### 3.1 Scale

| Role | Size / line | Weight | Tracking | Specimen |
|---|---|---|---|---|
| Display XL | 56 / 58 | 600 | −3 % | Every frame |
| Display L | 40 / 44 | 600 | −3 % | Every frame |
| Head | 24 / 30 | 600 | −2 % | Every frame |
| Subhead | 17 / 24 | 500 | −1 % | Every frame |
| Body | 16 / 26 | 400 | 0 | Every frame |
| UI | 13 / 18 | 400 / 500 | 0 | Every frame |
| Data | 12 / 16 | 500 | +5 % | `00:14:22:07 · 87%` |
| Meta | 10 / 14 | 400 | +9 % caps | `DRV-0A4F-2291` |
| AR Display | 42 / 54 | 600 | 0 | كل فريم تلاقيه |
| AR Body | 17 / 30 | 400 | 0 | وصّل القرص، وسيتولّى الباقي |

### 3.2 Setting rules

**Do**
- Sentence case for every headline and button
- Negative tracking on display sizes only
- Tabular figures on any number that can change
- Arabic +1 to +2 pt against Latin at the same optical size
- Maximum two weights per screen
- Measure 45–70 characters

**Don't**
- ALL CAPS headlines — caps belong to the meta layer only
- Italics — the system has no italic voice
- Letter-spacing applied to Arabic
- Justified text in either script
- Timecode, IDs or paths set in the sans
- Weights below 300 or above 600

---

## 4. Logo

The mark is **monotone in every version** — the dot is never a different colour to the brackets. In two-colour lockups the split is between **symbol and wordmark only**. Geometry is the original vector; the wordmark is drawn artwork and is never re-set in a live typeface.

### 4.1 Delivered files

**Stacked**

| File | Background | Mark | Wordmark |
|---|---|---|---|
| `ff-stacked-red-dark.svg` | Ink 950 | `#FF0000` | Ink 100 |
| `ff-stacked-red-light.svg` | Card | `#FF0000` | Ink 950 |
| `ff-stacked-red-solid.svg` | Ink 950 | `#FF0000` | `#FF0000` |
| `ff-stacked-knockout-on-red.svg` | `#FF0000` | White | White |
| `ff-stacked-mono-light.svg` | Ink 950 | Ink 100 | Ink 100 |
| `ff-stacked-mono-ink.svg` | Card | Ink 950 | Ink 950 |

**Horizontal**

| File | Background | Mark | Wordmark |
|---|---|---|---|
| `ff-horizontal-red-dark.svg` | Ink 950 | `#FF0000` | Ink 100 |
| `ff-horizontal-red-light.svg` | Card | `#FF0000` | Ink 950 |
| `ff-horizontal-knockout-on-red.svg` | `#FF0000` | White | White |
| `ff-horizontal-mono-light.svg` | Ink 950 | Ink 100 | Ink 100 |
| `ff-horizontal-mono-ink.svg` | Card | Ink 950 | Ink 950 |
| `ff-horizontal-currentcolor.svg` | any | `#FF0000` | `currentColor` |

`ff-horizontal-currentcolor.svg` is the one to ship in the Client — the wordmark inherits from CSS, so light and dark mode need no second asset.

**Symbol / wordmark:** `ff-symbol-red.svg`, `ff-symbol-light.svg`, `ff-symbol-ink.svg`, `ff-symbol-knockout-on-red.svg`, `ff-wordmark-light.svg`, `ff-wordmark-ink.svg`, `favicon.svg`.

### 4.2 On red, everything is white

The mark and the wordmark knock out in **white `#FFFFFF`** on any red field. There is no dark-on-red version of the logo and none should be produced. This is a brand rule, not a contrast calculation — logotypes are exempt from WCAG 1.4.3, and dark type on saturated red reads as harsh rather than premium.

The same rule governs the interface: a red button, badge, banner or plate carries white type. Where the text is small enough that white on Signal 500 (4.0:1) is not comfortable, deepen the field to **Signal 700 `#8F1410`** (white at 9.2:1) rather than darkening the type.

### 4.3 Clearspace & minimum sizes

Clearspace is **baked into every viewBox**, measured from real ink bounds rather than the original artboard. Placing an SVG at any size preserves it automatically — no manual padding needed.

Master units: `t` = bracket stroke width = **28.4** in master coordinate space. `C` = wordmark cap height = **106.1**.

| Asset | Clearspace | Screen min | Print min |
|---|---|---|---|
| Symbol | ⌀ 56.8 (2t) | 20 px | 7 mm |
| Horizontal lockup | ⌀ 56.8 | 120 px wide | 32 mm |
| Stacked lockup | ⌀ 56.8 | 88 px wide | 24 mm |
| Wordmark alone | 53.05 (0.5 C) | 88 px wide | 24 mm |

**Below 32 px height the wordmark is dropped** and the symbol is used alone on a solid plate.

### 4.4 Misuse

Never: stretch, condense, rotate, skew, or apply perspective · add shadow, glow, outline or gradient · recolour the dot separately from the brackets · use an off-palette colour · violate clearspace · re-scale one lockup element against the other · re-set the wordmark in a live font · repeat the mark as a pattern · transliterate the name into Arabic letterforms.

### 4.5 Arabic lockup

The name is **never transliterated into Arabic letterforms**. The Latin wordmark is the mark. In RTL layouts the layout mirrors; the mark does not. Only the descriptor localises: `محرّك البحث في أرشيفك`.

### 4.6 Known artwork issue

The supplied vector sits ~2 units off a true `t` grid on the inner bracket (measured 3.07t / 4.07t where the system calls for 3.0t / 4.0t). Invisible at display sizes; visible at 7 mm print and 20 px screen. Re-draw to exact multiples before the next vector release.

---

## 5. App icons

Two plates are delivered. **Default:** Ink 950 plate, `#FF0000` mark. **Alternate:** `#FF0000` plate, white mark — use where the icon needs to carry the brand colour itself (marketing, store listings, launcher grids with dark neighbours). Both use a **22.37 %** corner radius (the macOS squircle ratio) with the mark at **47 %** of the canvas. Below 32 px the plate carries the mark at 62 % with no radius, so it survives favicon rasterisation.

| File | Size | Format | Destination |
|---|---|---|---|
| `icon.png` | 512 × 512 | PNG | `FrameFinder-Client/build/` — ink plate |
| `icon-red-plate-512.png` · `-1024.png` | 512 · 1024 | PNG | Alternate — red plate, white mark |
| `icon.ico` | 16/32/48/64/128/256 | ICO | `FrameFinder-Client/build/` |
| `iconset.iconset/` | 16 → 1024 | PNG set | run `iconutil` → `icon.icns` |
| `favicon.ico` | 16/32 | ICO | `FrameFinder-Dashboard/public/` |
| `favicon.svg` | vector | SVG | `FrameFinder-Dashboard/public/` |
| `apple-touch-icon.png` | 180 × 180 | PNG | `FrameFinder-Dashboard/public/` |
| `icon-192.png` | 192 × 192 | PNG | PWA manifest |
| `icon-512.png` | 512 × 512 | PNG | PWA manifest |

`.icns` must be produced on macOS:

```bash
cd icons && iconutil -c icns iconset.iconset -o icon.icns
```

---

## 6. Token mapping

`framefinder-tokens.css` is the single source of truth. Neither repo redefines these values.

### 6.1 Client — Electron renderer

| Current token | Current value | New token | New value |
|---|---|---|---|
| `--ff-bg` (dark) | `#1C1C1E` | `--ff-ink-950` | `#0A0B0C` |
| `--ff-bg` (light) | `#F5F5F7` | `--ff-card` | `#EFEFED` |
| `--ff-surface` (dark) | `#2C2C2E` | `--ff-ink-900` | `#111315` |
| `--ff-surface-hover` (dark) | `#3A3A3C` | `--ff-ink-800` | `#1D2125` |
| `--ff-border` (dark) | `#38383A` | `--ff-ink-800` | `#1D2125` |
| `--ff-accent` | `#0A84FF` | `--ff-signal-400` / `600` | `#FF5A4F` / `#CC0000` |
| `--ff-accent-hover` | `#0070E0` | `--ff-signal-300` / `700` | `#FF9C94` / `#8F1410` |
| `--ff-accent-red` | `#FF453A` | `--ff-signal-400` | `#FF5A4F` |
| *(new)* | — | `--ff-on-signal` | `#FFFFFF` |
| `--ff-accent-green` | `#32D74B` | `--ff-confirmed` | `#4E9C6B` |
| `--ff-accent-orange` | `#FF9F0A` | `--ff-daylight-500` | `#5D87BC` |
| `--ff-accent-indigo` | `#5E5CE6` | `--ff-daylight-500` | `#5D87BC` |
| `--ff-text-primary` (dark) | `#FFFFFF` | `--ff-ink-100` | `#E6EAEC` |
| `--ff-text-secondary` | `rgba(235,235,245,.6)` | `--ff-ink-400` | `#7C858D` |
| `--ff-text-tertiary` | `rgba(235,235,245,.3)` | `--ff-ink-500` | `#565E66` |

### 6.2 Dashboard — Next.js admin

| Current token | Current value | New token | New value |
|---|---|---|---|
| `bg-primary` | `#0F1117` | `--ff-ink-950` | `#0A0B0C` |
| `bg-secondary` | `#1A1D27` | `--ff-ink-900` | `#111315` |
| `bg-elevated` | `#21253A` | `--ff-ink-850` | `#16191C` |
| `border-subtle` | `#2D3147` | `--ff-ink-800` | `#1D2125` |
| `accent-indigo` | `#6366F1` | `--ff-signal-400` | `#FF5A4F` |
| `accent-violet` | `#8B5CF6` | `--ff-daylight-500` | `#5D87BC` |
| `accent-emerald` | `#10B981` | `--ff-confirmed` | `#4E9C6B` |
| `accent-amber` | `#F59E0B` | `--ff-daylight-400` | `#7FA6D6` |
| `accent-red` | `#EF4444` | `--ff-signal-400` | `#FF5A4F` |
| `text-primary` | `#F1F5F9` | `--ff-ink-100` | `#E6EAEC` |
| `text-secondary` | `#94A3B8` | `--ff-ink-400` | `#7C858D` |
| `text-tertiary` | `#475569` | `--ff-ink-500` | `#565E66` |
| shadow `glow` | `rgba(99,102,241,.25)` | signal glow | `rgba(255,90,79,.22)` |

Amber and orange map to **Daylight**, not to a warning colour. Warnings are carried by copy and iconography, not by a third hue.

Radius values are unchanged — 8 / 12 / 16 px in both repos. The brand does not fight the platform.

---

## 7. Implementation

### 7.1 Dashboard — `src/app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: 'FrameFinder',
  description: 'Search engine for your video archive.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = { themeColor: '#0A0B0C' };
```

### 7.2 Client — `Logo.tsx`

```tsx
// sm must render the symbol, not the full lockup —
// the wordmark is illegible below 32 px.
const src = size === 'sm'
  ? 'assets/ff-symbol-red.svg'
  : 'assets/ff-horizontal-currentcolor.svg';
```

### 7.3 Shared tokens

```css
/* both repos import the same file — never fork the values */
@import '@framefinder/tokens/framefinder-tokens.css';
```

### 7.4 Order of work

1. Drop `public/` into the Dashboard — favicon, icons, manifest, `logo.svg`.
2. Add the metadata block above; replace the plain-text sidebar header with a `<Logo />` component.
3. Replace the Client's `logo.svg` with `ff-horizontal-currentcolor.svg`; fix the `sm` size branch.
4. Regenerate `build/icon.*` from the delivered icons; run `iconutil` for `.icns` on macOS.
5. Land `framefinder-tokens.css` in both repos, **then** delete the old variable blocks — not before.
6. Add `next/font` imports for IBM Plex Mono and IBM Plex Sans Arabic in the Dashboard. Decide whether the Client moves from system fonts to Inter for consistency.

---

## 8. Package index

| Path | Contents |
|---|---|
| `logo/` | 19 SVG — stacked, horizontal, symbol, wordmark, currentColor, favicon |
| `icons/icon.png` · `icon.ico` | Electron app icons |
| `icons/iconset.iconset/` | macOS source set → `iconutil` |
| `icons/public/` | Drop straight into `FrameFinder-Dashboard/public/` |
| `tokens/framefinder-tokens.css` | Shared design tokens — single source of truth |
| `tokens/manifest.webmanifest` | PWA manifest |
| `framefinder-ci-red.html` | Visual reference — the same spec, rendered |
