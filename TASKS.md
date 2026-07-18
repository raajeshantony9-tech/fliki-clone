# Eomar Labs Development Tasks

## ✅ Completed
- [x] Project initialization (npm init, Next.js 16.2.10 setup)
- [x] TypeScript configuration (strict mode, path alias `@/*`)
- [x] Tailwind CSS v4 setup via `@tailwindcss/postcss`
- [x] Landing page structure (`app/layout.tsx`, `app/page.tsx`)
- [x] Navbar component with site title and Sign‑In button
- [x] Hero section with tagline and illustration emoji
- [x] PromptBox component (textarea + Generate Video button)
- [x] VideoTypeSelector component (dropdown: Shorts, Long Video, Kids Rhymes)
- [x] Rebranding from "Fliki Clone" to "Eomar Labs" (UI text, metadata, package name)
- [x] SEO metadata update (title: "Eomar Labs – AI Video Creation Platform", description: detailed)
- [x] GitHub repository setup (initial commit, main branch)
- [x] Created `PROJECT_CONTEXT.md` with comprehensive project documentation
- [x] Designed Storyboard AI architecture (data flow, services, components, API routes, DB schema)
- [x] Scaffolded Storyboard AI file structure (folders and placeholder files)
- [x] Regenerated `package-lock.json` to match updated `package.json` (name: `eomar-labs`)
- [x] ESLint configuration (`eslint-config-next`) and lint script
- [x] Basic routing and layout using Next.js App Router
- [x] Created shared TypeScript interfaces (`types/storyboard.ts`, `types/job.ts`, `types/media.ts`)
- [x] Updated interface files with TODO comments for future extensions

## 🚧 Currently In Progress
- [ ] Set up authentication middleware (NextAuth.js or custom JWT)
- [ ] Implement real LLM integration for script generation (OpenAI/Anthropic)
- [ ] Connect to image generation API (Stability AI / Replicate)
- [ ] Connect to TTS provider (ElevenLabs / Azure)
- [ ] Implement scene breakdown logic (LLM‑based or rule‑based)
- [ ] Create storage abstraction (S3/GCS) and replace in‑memory mock
- [ ] Set up job queue (BullMQ or Upstash Redis) for background processing
- [ ] Add Prisma ORM integration and migrate schema to PostgreSQL (dev SQLite for now)
- [ ] Implement API route validation and error handling
- [ ] Create unit test scaffold (Jest + React Testing Library)

## 📅 Next Milestones

### Phase 1 – Storyboard Foundation
- [ ] Create Storyboard page (`app/(dashboard)/storyboard/page.tsx`) with layout
- [ ] Define shared TypeScript types (`types/storyboard.ts`, `types/job.ts`, `types/media.ts`)
- [ ] Build Storyboard components: StoryboardHeader, PromptInput, ScriptPreview, SceneList, SceneCard, ImagePreview, VoicePreview, TimelineEditor, ExportButton, ProgressTracker
- [ ] Implement state management hooks: `useStoryboard`, `useTimeline`
- [ ] Create API routes for storyboards: CRUD, start generation, job status, cancel, export
- [ ] Add lightweight in‑memory repository (placeholder) for storyboard and job data
- [ ] Wire up UI to API via `lib/storyboardApi.ts`
- [ ] Ensure page loads without errors and shows placeholder data

### Phase 2 – AI Pipeline
- [ ] Implement `services/ai/scriptService.ts` to call OpenAI GPT‑4 Turbo (or Claude 3) with retry logic
- [ ] Implement `services/ai/sceneService.ts` to split script into scenes (LLM‑based or regex)
- [ ] Implement `services/ai/imagePromptService.ts` to enrich scene description into image prompt
- [ ] Implement `services/media/imageService.ts` to call image generation API (Stability XL / DALL·E 3) and store result via storage layer
- [ ] Implement `services/media/voiceService.ts` to call TTS provider (ElevenLabs) and store audio
- [ ] Implement `services/media/subtitleService.ts` to generate subtitle files (Whisper.cpp or sentence splitter)
- [ ] Add environment variables for API keys (`OPENAI_API_KEY`, `STABILITY_API_KEY`, `ELEVENLABS_API_KEY`, etc.)
- [ ] Update job steps (`jobs/steps/*`) to call the real services and persist results via repository
- [ ] Add logging and error handling for each step
- [ ] Test end‑to‑end flow: prompt → script → scenes → images → voice → subtitles → timeline (placeholder)

### Phase 3 – Timeline Editor
- [ ] Design timeline data model (`TimelineTrack`, `Transition`, `Effect`) in `types/storyboard.ts`
- [ ] Implement `services/video/timelineService.ts` for validation and serialization
- [ ] Build `TimelineEditor` component using a drag‑and‑drop library (e.g., `react-dnd` or `@hello-pangea/dnd`)
- [ ] Support adding/removing tracks, trimming clips, changing order, setting start/end times
- [ ] Allow selection of transition type (fade, slide, zoom) and duration between clips
- [ ] Provide basic video preview (using HTML5 video element with blob URL from `ffmpeg.wasm` or static placeholder)
- [ ] Enable manual edit of scene properties (image prompt, voice text, subtitle text) from timeline
- [ ] Persist timeline changes to storyboard via `PATCH /api/storyboard/[id]`
- [ ] Add unit tests for timeline manipulation logic

### Phase 4 – Video Rendering
- [ ] Implement `services/video/renderService.ts` to assemble media using `ffmpeg.wasm` for previews and/or call cloud rendering API (Shotstack / Cloudinary Video) for final export
- [ ] Create `services/video/exportService.ts` to poll render job, move output to storage bucket, return signed URL
- [ ] Add webhook endpoints in `api/storyboard/webhooks/route.ts` to receive completion callbacks from external renderers
- [ ] Update `jobs/steps/renderVideo.ts` to dispatch render job and store render job ID
- [ ] Update `jobs/steps/applyEffects.ts` to apply transitions and effects to timeline before rendering
- [ ] Build Export UI: show progress, provide download link and preview player when ready
- [ ] Add cleanup step to delete temporary files after successful export
- [ ] Test rendering of a short clip (≤10 s) with placeholder media assets generated in earlier phases

### Phase 5 – Authentication
- [ ] Choose authentication provider (NextAuth.js with Credentials, GitHub, Google)
- [ ] Create `/app/(dashboard)/layout.tsx` with protected routes (redirect to login if unauthenticated)
- [ ] Implement login page (`/app/(dashboard)/login/page.tsx`) and signup page
- [ ] Protect storyboard routes, ensure only authenticated users can create/view/edit storyboards
- [ ] Add user profile page and session management
- [ ] Connect auth user ID to storyboard creation (store `userId` in Storyboard entity)

### Phase 6 – Payments
- [ ] Define subscription plans (Free, Pro, Enterprise) with credit‑based pricing
- [ ] Integrate payment gateway (Stripe / Paddle) for recurring billing and one‑time credit purchases
- [ ] Implement credit system: deduct credits per AI operation (script, image, voice, render)
- [ ] Create billing portal and invoice download
- [ ] Add webhook handling for payment events (success, failure, refund)
- [ ] Display credit balance in UI and enforce limits before starting jobs

### Phase 7 – Production
- [ ] Write unit tests for services, repositories, and utilities
- [ ] Add integration tests for API routes (using `supertest` or similar)
- [ ] Implement end‑to‑end Cypress tests for core user flow (prompt → export)
- [ ] Perform security audit: sanitize prompts, validate file types, rate‑limit API endpoints
- [ ] Optimize bundle size: code‑splitting, dynamic imports, tree‑shaking
- [ ] Set up CI/CD pipeline (GitHub Actions) for lint, test, build, and deploy to Vercel
- [ ] Configure monitoring and logging (e.g., Sentry, LogRocket) for production
- [ ] Prepare documentation for contributors and API reference
- [ ] Conduct load testing and scale job workers as needed

## 🐛 Bugs
- [ ] Address npm audit vulnerabilities (2 moderate) – consider `npm audit fix --force` after verifying compatibility
- [ ] Ensure TypeScript strict mode does not produce false positives in new code
- [ ] Validate that all new files compile without errors (`npm run build`)

## 💡 Future Ideas
- [ ] Template library (premade storyboards for ads, tutorials, etc.)
- [ ] Real‑time collaboration (Yjs or similar)
- [ ] Brand kits (custom fonts, colors, logos)
- [ ] Multi‑language support (i18n UI, multilingual subtitles)
- [ ] Analytics dashboard (views, engagement, export counts)
- [ ] Public API access (REST/OpenAPI) for developers
- [ ] AI‑powered scene suggestions and auto‑editing
- [ ] Integration with stock media libraries (Pexels, Unsplash)
- [ ] Export to social media formats (YouTube, TikTok, Instagram) with presets

## 📌 Notes
- Keep the landing‑page (`/app/page.tsx`, `/app/layout.tsx`, `/components/*`) untouched unless a change is explicitly required for global layout (e.g., adding auth redirects).
- All new code should follow the existing TypeScript and ESLint rules.
- When adding environment variables, update `.env.example` (do not commit real keys).
- Use the `@/` alias for absolute imports; avoid relative paths that deepen tree traversal.
- Regularly sync `package-lock.json` after adding new dependencies.
- For any UI component, reuse existing Tailwind utility classes from the landing page to maintain visual consistency.
- Document any non‑obvious decisions in `PROJECT_CONTEXT.md` to keep knowledge base up‑to‑date.