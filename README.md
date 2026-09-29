# Nithin Senthilkumar — Videographer & Video Editor

A simple, cinematic one-page portfolio. Plain HTML/CSS/JS — no build step.

## Preview it

Open this folder in a terminal (in Cursor/VS Code: ``Ctrl+` ``) and run:

```
npx serve .
```

Then open the link it prints (e.g. http://localhost:3000). Stop with `Ctrl+C`.

## Edit your details → `js/site.js`

Name, role, tagline, email, Instagram, phone, hero video, portrait, about text and services.

## Edit your projects → `js/projects.js`

Each project is one block:

```js
{
  title: "Project Name",
  category: "Brand Film",
  poster: "media/projects/project-7.jpg",          // thumbnail
  preview: "media/projects/project-7-preview.mp4", // short muted loop (optional)
  video: "media/projects/project-7.mp4",           // full film (or a YouTube/Vimeo embed link)
},
```

Add, remove or reorder blocks — the grid updates automatically.

## Replacing media

| What | Where | Tips |
|---|---|---|
| Hero video | `media/hero.mp4` (+ `hero.jpg` poster) | 8–12 s, muted, landscape, < 5 MB |
| Hero on phones | `media/hero-mobile.mp4` (+ `.jpg`) | vertical clip; set to `""` in site.js to skip |
| Project thumbnails | `media/projects/*.jpg` | ~900 px wide, < 200 KB |
| Project previews | `media/projects/*-preview.mp4` | ~5 s, no audio, 720 px wide, < 2 MB |
| Full films | `media/projects/*.mp4` | MP4 (H.264), 1080p, “Web optimized” ticked |
| Portrait | `assets/images/` | then update `portrait` in site.js |

Export tip (HandBrake): preset **Fast 1080p30**, tick **Web Optimized**, RF 22–24.

Your original masters stay in `videos/` — the site uses the optimized copies in `media/`.

## Styling

Colors and fonts are the `:root` variables at the top of `css/style.css`.

## Put it online

Drag the folder onto https://app.netlify.com/drop — done.
