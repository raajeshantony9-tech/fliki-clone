# Eomar Labs – Project Context Document

## 🎯 Project Vision & Mission
**Vision:** To democratize AI‑powered video creation so anyone can turn ideas into professional‑quality videos in minutes.  
**Mission:** Provide an intuitive, end‑to‑end platform that combines large‑language models, generative image/audio models, and smart timeline assembly to automate the storyboard‑to‑video pipeline.

---

## 📊 Current Project Status (as of 2026‑07‑18)
- **Phase:** Foundation & MVP scaffolding  
- **Core Deliverable:** Landing page (Flki Clone) rebranded to **Eomar Labs** with basic UI components (Navbar, Hero, PromptBox, VideoTypeSelector).  
- **Storyboard AI:** Architecture designed; file‑system scaffold completed. No business logic implemented yet.  
- **Repository:** Public Git repo; main branch stable, passes linting, builds with `next dev`/`next build`.  
- **Issues:** 2 moderate npm audit vulnerabilities (to be addressed in next sprint).  

---

## 🛠️ Technology Stack

| Layer | Current Choice | Planned / Optional | Notes |
|-------|----------------|-------------------|-------|
| **Framework** | Next.js 16.2.10 (App Router, React 19) | – | Server Components by default |
| **Language** | TypeScript 5 | – | Strict mode enabled |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/postcss`) | – | Utility‑first, dark mode ready |
| **State Management** | React Context / Hooks (currently) | Zustand / Jotai / React Query (planned) | For complex async data |
| **Styling/UI Library** | Custom Tailwind components | Headless UI / Radix (future) | Accessible primitives |
| **Build Tool** | Next.js built‑in webpack/turbopack | – | Incremental static regeneration |
| **AI Services (Backend)** | Placeholder services (LLM, Image, TTS) | OpenAI GPT‑4 Turbo, Anthropic Claude 3, Stability AI, ElevenLabs, Azure TTS, Whisper | Abstracted via service layer |
| **Storage** | In‑memory mock (`lib/storage/upload.ts`) | AWS S3 / Google Cloud Storage / Cloudinary | Signed URLs for secure access |
| **Job Queue** | In‑memory array (demo) | BullMQ / Upstash Redis | Reliable background processing |
| **Database** | SQLite via Prisma (schema only) | PostgreSQL (production) | Prisma ORM for migrations |
| **Testing** | – | Jest + React Testing Library, Cypress (E2E) | To be added |
| **CI/CD** | – | GitHub Actions (lint, test, build, deploy) | Planned |
| **Deployment** | Vercel (preview) | Vercel / AWS Amplify / Docker | Preview environment active |

---

## 📁 Folder Structure (as of scaffolding)

```
/app
  /(dashboard)                     # Optional protected area (auth TBD)
    /storyboard
      page.tsx                     # Entry point for storyboard creator
      layout.tsx                   # Wrapper with sidebar/header
      /components                  # UI pieces specific to storyboard
        StoryboardHeader.tsx
        PromptInput.tsx
        ScriptPreview.tsx
        SceneList.tsx
        SceneCard.tsx
        ImagePreview.tsx
        VoicePreview.tsx
        TimelineEditor.tsx
        ExportButton.tsx
        ProgressTracker.tsx
      /hooks
        useStoryboard.ts           # Data fetching & mutation
        useTimeline.ts             # Timeline state management
      /lib
        storyboardApi.ts           # Thin wrapper over /api/storyboard/*
        types.ts                   # Re‑exports of shared TS types
/components                        # Existing landing‑page components (unchanged)
/public                            # Static assets (SVGs, favicon)
/api
  /storyboard
    route.ts                       # CRUD + generation triggers
    /tasks
      route.ts                     # Job enqueue / list
    /webhooks
      route.ts                     # External provider callbacks
/services
  /ai
    scriptService.ts               # LLM → script
    sceneService.ts                # Script → scenes
    imagePromptService.ts          # Scene → image prompt
  /media
    imageService.ts                # Prompt → image (external model)
    voiceService.ts                # Text → audio (TTS)
    subtitleService.ts             # Script/audio → subtitles
  /video
    timelineService.ts             # Validate & serialize timeline
    renderService.ts               # Assemble media → video (ffmpeg.wasm or cloud)
    exportService.ts               # Finalize render → CDN URL
/jobs
  storyboardProcessor.ts           # BullMQ‑style worker orchestration
  /steps                           # Fine‑grained pipeline steps
    generateScript.ts
    breakScenes.ts
    createImagePrompts.ts
    generateImages.ts
    generateVoice.ts
    generateSubtitles.ts
    buildTimeline.ts
    applyEffects.ts
    renderVideo.ts
/lib
  /storage
    upload.ts                      # Abstract storage layer (mock)
  /utils
    uuid.ts                        # UUID helper
    retry.ts                       # Exponential backoff
/db
  schema.prisma                    # Prisma data model
  /repositories
    storyboardRepository.ts        # In‑memory placeholder repo
    jobRepository.ts               # Job tracking placeholder
/types
  storyboard.ts                    # Core TS interfaces
  job.ts                           # Job tracking interfaces
  media.ts                         # Media asset & AI options unions
```

> **Note:** The existing landing‑page (`/app/layout.tsx`, `/app/page.tsx`, `/components/*`, `/public/*`, configuration files) remain untouched and fully functional.

---

## ✅ Coding Standards & Best Practices

- **TypeScript:** Strict mode (`"strict": true`). No `any` unless absolutely necessary (with `@ts-ignore` comment).  
- **File Naming:** PascalCase for React components (`ComponentName.tsx`), camelCase for utilities and hooks.  
- **Imports:** Use absolute paths with `@/` alias (configured in `tsconfig.json`).  
- **Component Size:** Aim for < 150 lines; extract logic into custom hooks or service classes.  
- **Styling:** Tailwind utility classes only; avoid custom CSS unless unavoidable. Use `@apply` sparingly in `globals.css` for base styles.  
- **State:** Prefer server‑side data fetching; client state only for UI optimizations (form inputs, timeline dragging). Use React Query/SWR for caching once adopted.  
- **Error Handling:** Async functions throw; API routes wrap in try/catch and return appropriate HTTP status. UI shows toast/error boundary for unexpected errors.  
- **Logging:** Use `console` with structured JSON in dev; replace with a logger (pino, winston) in prod.  
- **Security:** Sanitize all user‑generated prompts before sending to LLMs; validate file types and sizes; use signed, time‑limited URLs for media.  
- **Testing:** Write unit tests for services (mock external APIs). Integration tests for API routes. E2E tests for critical user flows (prompt → export).  

---

## 🔄 Development Workflow

1. **Feature Branching:**  
   - `git checkout -b feature/<short-description>` from `main`.  
   - Keep branches short‑lived; merge via PR after review.  

2. **Local Dev:**  
   ```bash
   npm install          # first time or after lockfile changes
   npm run dev          # starts Next.js dev server on http://localhost:3000
   ```
   - Fast Refresh enabled; edits to TS/TSX trigger instant update.  

3. **Lint & Format:**  
   ```bash
   npm run lint         # runs ESLint (next‑js config)
   ```
   - Prettier integrated via ESLint; format on save recommended.  

4. **Testing (future):**  
   ```bash
   npm test             # Jest + React Testing Library
   npm run cypress:open # Cypress UI
   ```

5. **Commit Message Convention:**  
   - `<type>(<scope>): <subject>`  
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.  
   - Example: `feat(storyboard): add script generation service`.  

6. **Pull Request Process:**  
   - Open PR against `main`.  
   - At least one approval required.  
   - CI runs lint, build, test (when available).  
   - Squash and merge to keep linear history.  

7. **Release:**  
   - Tag version (`v0.1.0`, `v0.2.0`, …).  
   - Deploy to Vercel automatically via Git integration.  

---

## 🔧 Git Workflow Summary

| Step | Command | Description |
|------|---------|-------------|
| **Clone** | `git clone <repo-url>` | Obtain source |
| **Sync** | `git fetch origin && git rebase origin/main` | Keep up‑to‑date |
| **Branch** | `git checkout -b feature/xyz` | Isolate work |
| **Commit** | `git add -A && git commit -m "feat: add XYZ"` | Atomic commits |
| **Push** | `git push -u origin feature/xyz` | Share for review |
| **PR** | Open PR on GitHub | Review & discussion |
| **Merge** | `git checkout main && git merge --ff-only feature/xyz` (or squash) | Integrate |
| **Cleanup** | `git branch -d feature/xyz` | Remove local branch |
| **Tag** | `git tag v0.1.0 && git push origin v0.1.0` | Mark release |

---

## ✅ Completed Features (Landing Page)

- [x] Rebranding from “Fliki Clone” to “Eomar Labs” (UI text, metadata, package name)  
- [x] Responsive layout with Tailwind CSS  
- [x] Navbar with site title and Sign‑In button (placeholder)  
- [x] Hero section with tagline and illustration emoji  
- [x] Prompt textbox + Generate Video button (non‑functional)  
- [x] Video type selector dropdown (Shorts, Long Video, Kids Rhymes)  
- [x] Basic Next.js App Router structure (`layout.tsx`, `page.tsx`)  
- [x] Global CSS with dark‑mode support via `prefers-color-scheme` media query  
- [x] ESLint & TypeScript configuration (strict)  

---

## 🧩 Storyboard AI Architecture Summary (High‑Level)

1. **User Input:** Text prompt entered in `PromptInput`.  
2. **AI Script Generation:** Calls LLM (`ScriptService.generate`) → raw script stored.  
3. **Scene Breakdown:** `SceneService.breakdown` splits script into scenes with description, duration estimate, dialogue.  
4. **Image Prompt Generation:** `ImagePromptService.build` enriches each scene description into a detailed prompt for image models.  
5. **AI Image Generation:** `ImageService.generate` (Stable Diffusion / DALL·E) returns image URLs stored per scene.  
6. **Voice Generation:** `VoiceService.synthesize` (ElevenLabs / Azure TTS) creates audio per scene if dialogue present.  
7. **Subtitle Generation:** `SubtitleService.generate` (Whisper‐like or rule‑based) creates `.vtt/.srt` files per scene.  
8. **Timeline Assembly:** `TimelineService` builds sequential tracks (image, audio, subtitle) and adds simple fade transitions.  
9. **Effects & Transitions:** Placeholder for applying visual effects (zoom, color, blur).  
10. **Video Render:** `RenderService.assemble` either uses `ffmpeg.wasm` for preview or dispatches to a cloud render API (Shotstack, Cloudinary).  
11. **Export & CDN:** `ExportService.finalize` moves rendered output to permanent storage, returns signed URL.  
12. **Job Queue:** Each storyboard flows through a series of steps; each step updates progress in a `StoryboardJob` record via BullMQ worker.  
13. **Persistence:** Prisma models store storyboards, scripts, scenes, timelines, subtitle assets, and job status.  
14. **Client UI:** React components display script, scene cards with thumbnails, voice previews, timeline editor (drag‑and‑drop), progress tracker, and export button.  

All backend logic lives under `/services`, `/jobs/steps`, and `/db/repositories`. The API layer (`/api/storyboard/*`) is thin and guarded by authentication middleware (to be added).

---

## 🗺️ Future Roadmap

### Phase 0 – Foundation (Complete)
- Project setup, rebranding, landing page, Storyboard AI scaffold.

### Phase 1 – Core AI Pipeline (Next Sprint)
- [ ] Implement real LLM call (OpenAI/Anthropic) in `scriptService`.  
- [ ] Implement scene breakdown (LLM‑based or regex).  
- [ ] Connect to an image generation API (Stable Diffusion via Replicate or Stability AI).  
- [ ] Connect to a TTS provider (ElevenLabs free tier or Azure).  
- [ ] Store generated assets in mock storage; return placeholder URLs.  
- [ ] Expose `/api/storyboard/[id]/generate` to start a job and poll status.  
- [ ] Basic UI: show generated script, scene list with placeholders, and a “Generate Video” button that triggers the pipeline.

### Phase 2 – Media Assembly & Timeline (Sprint 2)
- [ ] Implement subtitle generation (Whisper.cpp or simple sentence split).  
- [ ] Build timeline service (sequential tracks + fade transitions).  
- [ ] Integrate `ffmpeg.wasm` for client‑side preview rendering (short clips).  
- [ ] UI: TimelineEditor with drag‑and‑drop tracks, trim handles, transition selection.  
- [ ] Allow manual edit of prompts, images, voice, subtitles; update optimistic UI.

### Phase 3 – Cloud Rendering & Export (Sprint 3)
- [ ] Integrate with a cloud video rendering service (Shotstack API or Cloudinary Video).  
- [ ] Implement webhook endpoints to receive completion callbacks.  
- [ ] Finalize export service: move output to S3/GCS, return signed download URL.  
- [ ] UI: Export button shows progress, then provides download link and preview player.

### Phase 4 – Polish & Production Ready (Sprint 4)
- [ ] Add authentication (NextAuth.js with GitHub/Google).  
- [ ] Persist storyboards & jobs to PostgreSQL via Prisma.  
- [ ] Implement rate‑limiting & quota system per user.  
- [ ] Add comprehensive error handling, retry logic, and user‑friendly error messages.  
- [ ] Write unit & integration tests for services and API routes.  
- [ ] Add E2E Cypress tests for core flow (prompt → export).  
- [ ] Optimize bundle size (code‑splitting, dynamic imports).  
- [ ] Prepare deployment pipeline on Vercel with preview URLs for PRs.  

### Phase 5 – Advanced Features (Post‑MVP)
- [ ] Template library (premade storyboards for ads, tutorials, etc.).  
- [ ] Collaboration (real‑time co‑editing with Yjs or similar).  
- [ ] Brand kits (custom fonts, colors, logos).  
- [ ] Multi‑language support (i18n UI, multilingual subtitles).  
- [ ] Analytics dashboard (views, engagement, export counts).  
- [ ] API access for external developers (REST/OpenAPI).  

---

## ⚖️ Important Project Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js App Router** | Leverages React Server Components for zero‑JS initial payload, automatic code splitting, and built‑in image/font optimization. |
| **Tailwind CSS v4** | Utility‑first speeds UI iteration; minimal CSS bundle; dark‑mode out‑of‑the‑box. |
| **TypeScript Strict** | Catches bugs early; improves IDE experience for contributors. |
| **Service‑Layer Abstraction** | Makes swapping AI providers (OpenAI ↔ Claude, Stability ↔ DALL·E) trivial without touching UI or routes. |
| **In‑Memory Job Queue for Demo** | Allows rapid iteration; production will replace with BullMQ/Upstash for reliability and scaling. |
| **Prisma ORM** | Type‑safe DB migrations; works with SQLite (dev) and PostgreSQL (prod) with minimal changes. |
| **Modular Step‑Based Jobs** | Each pipeline step is testable, restartable, and observable; simplifies error handling and retries. |
| **Placeholder Storage** | Avoids cloud‑cost during development; production switch is a one‑line change in `lib/storage/upload.ts`. |
| **Separate `/types` Folder** | Centralizes interfaces, prevents circular dependencies, and eases barcode generation for API contracts. |

---

## 🤖 Planned AI Services

| Service | Provider Options | Input | Output | Notes |
|---------|------------------|-------|--------|-------|
| **LLM (Script)** | OpenAI GPT‑4 Turbo, Anthropic Claude 3, local Llama‑3 via Ollama | Prompt | Video script (plain text) | Temperature ~0.7 for creativity |
| **Scene Breakdown** | Same LLM (zero‑shot) or rule‑based (regex) | Script text | List of scenes (description, duration, dialogue) | Could be fine‑tuned on screenplay datasets |
| **Image Prompt** | Optional LLM enrichment | Scene description + style | Detailed prompt for image model | Prompt engineering improves visual fidelity |
| **Image Generation** | Stability AI Stable Diffusion XL, OpenAI DALL·E 3, Midjourney (via API), Replicate | Prompt | PNG/JPEG image URL | 1024×1024 or 1024×576 for video frames |
| **Voice (TTS)** | ElevenLabs, Azure Cognitive Services, Amazon Polly, Google WaveNet | Text (+ voice/style) | Audio (MP3/OGG) | Supports multiple languages & expressivity |
| **Subtitles** | OpenAI Whisper, faster‑whisper, or custom sentence splitter | Script/audio duration | `.vtt` or `.srt` file | Sentence‑level timestamps; optional karaoke highlighting |
| **Video Render** | `ffmpeg.wasm` (browser/serverless), Shotstack API, Cloudinary Video, FFmpeg on VM | Timeline JSON + asset URLs | MP4 video | Final step; supports transitions, overlay text, music |
| **Music / SFX (Future)** | royalty‑free API (e.g., Artlist, Epidemic Sound) or generative music models | Mood/genre | Audio track | Optional background layer |

---

## 📝 Notes for Future Contributors & AI Assistants

1. **Start Small:** When adding a new feature, first create a thin API route, then a corresponding service, then hook it up via the job step or UI component. Keep each PR focused (< 200 lines changed).  
2. **Type‑First Approach:** Define or extend TS interfaces in `/types` before implementing logic; this ensures both backend and frontend stay in sync.  
3. **Avoid Magic Strings:** Use constants/enums for statuses, steps, and provider names (e.g., `export const STEP = { GENERATE_SCRIPT: 'generateScript', ... }`).  
4. **Error Propagation:** Let asynchronous functions `throw`; catch at the API route level to return proper HTTP status codes (400, 500, etc.).  
5. **Observability:** Each service method should log entry/exit with correlation ID (e.g., `req.headers['x-request-id']`). In production, forward logs to a structured logger.  
6. **Testing Guideline:**  
   - **Unit:** Mock external fetch calls (`msw` or `jest.fn()`).  
   - **Integration:** Use `supertest` against Next.js API routes.  
   - **E2E:** Cypress visiting `/dashboard/storyboard` and asserting progress bar reaches 100%.  
7. **Styling Consistency:** Stick to the existing Tailwind palette from the landing page (`gray-800`, `blue-600`, etc.). If new colors are needed, add them to `tailwind.config.ts` (to be created) rather than inline arbitrary hex values.  
8. **Documentation:** Update this `PROJECT_CONTEXT.md` whenever a major decision or architectural change occurs. Keep `README.md` focused on getting started; detailed design lives here.  
9. **Branch Naming:** Use `feature/`, `bugfix/`, `refactor/`, `docs/` prefixes.  
10. **Code Reviews:** Look for:  
    - No `@ts-ignore` without justification.  
    - No direct `process.env` in components; prefer a config wrapper.  
    - All file paths use `/` (POSIX) even on Windows for uniformity.  
    - No large blobs (>100 KB) committed to repo—use Git LFS if absolutely necessary (currently none).  

---

## 📚 References & Further Reading

- Next.js Docs – App Router: https://nextjs.org/docs/app  
- Tailwind CSS v4: https://tailwindcss.com/docs/installation  
- TypeScript Handbook: https://www.typescriptlang.org/docs/  
- Prisma ORM: https://www.prisma.io/docs  
- BullMQ: https://bullmq.io/  
- OpenAI API: https://platform.openai.com/docs/api-reference  
- Stability AI: https://stability.ai/docs/api  
- ElevenLabs: https://elevenlabs.io/docs  
- Whisper.cpp: https://github.com/ggerganov/whisper.cpp  

--- 

*Document last updated: 2026‑07‑18*  
*Author: Eomar Labs Maintainer (via Claude Code)*