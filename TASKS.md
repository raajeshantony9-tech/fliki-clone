# Eomar Labs Development Tasks

## ✅ Completed
- [x] Project initialization (npm init, Next.js 16.2.10 setup)
- [x] TypeScript configuration (strict mode, paths alias)
- [x] Tailwind CSS v4 setup via `@tailwindcss/postcss`
- [x] Landing page structure (app/layout.tsx, app/page.tsx)
- [x] Navbar component with site title and Sign-In button
- [x] Hero section with tagline and illustration emoji
- [x] PromptBox component (textarea + Generate Video button)
- [x] VideoTypeSelector component (dropdown: Shorts, Long Video, Kids Rhymes)
- [x] Rebranding from "Fliki Clone" to "Eomar Labs" (UI text, metadata, package name)
- [x] SEO metadata update (title: "Eomar Labs – AI Video Creation Platform", description: detailed)
- [x] GitHub repository setup (initial commit, main branch)
- [x] Created PROJECT_CONTEXT.md with comprehensive project documentation
- [x] Designed Storyboard AI architecture (data flow, services, components, API routes, DB schema)
- [x] Scaffolded Storyboard AI file structure (folders and placeholder files)
- [x] Regenerated package-lock.json to match updated package.json (name: eomar-labs)
- [x] ESLint configuration (eslint-config-next) and lint script
- [x] Basic routing and layout using Next.js App Router

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
- [ ] Store user info in database (User model, link to storyboards and jobs)
- [ ] Add middleware to attach `userId` to storyboard creation and job ownership
- [ ] Show user‑specific dashboard listing own storyboards
- [ ] Allow logout and session management
- [ ] Add basic UI components: Avatar, Dropdown menu, Notification toast
- [ ] Write tests for authentication flow

### Phase 6 – Payments
- [ ] Define subscription plans (Free, Pro, Enterprise) with monthly/annual billing
- [ ] Integrate Stripe (or Lemon Squeezy) for payment processing
- [ ] Create credit‑based system: each video generation consumes credits based on length/resolution
- [ ] Build billing portal page to view invoices, update payment method, change plan
- [ ] Add webhook endpoint to handle Stripe events (payment succeeded, subscription changed, etc.)
- [ ] Enforce credit limits in API routes (check before starting generation)
- [ ] Provide UI to purchase credits or upgrade plan
- [ ] Add automated emails (via SendGrid or similar) for receipts and reminders

### Phase 7 – Production
- [ ] Write comprehensive unit tests for services (`*.service.ts`) using mocked external APIs
- [ ] Write integration tests for API routes (`/api/storyboard/*`) using `supertest`
- [ ] Add end‑to‑end Cypress tests covering core user flow: login → create storyboard → generate video → export → download
- [ ] Perform security audit: sanitize user prompts, validate file types, enforce rate limits, use helmet.js, implement CSP
- [ ] Optimize bundle size: dynamic imports for heavy libraries (ffmpeg.wasm, editor libs), code splitting, tree shaking
- [ ] Implement caching layer (Redis or in‑memory) for frequent API responses (e.g., user profile)
- [ ] Set up monitoring and logging (Sentry for errors, Logtail or Datadog for performance metrics)
- [ ] Configure CI/CD pipeline: GitHub Actions to run lint, tests, build on every PR and push to main
- [ ] Enable preview deployments on Vercel for each PR, production deployment on main branch
- [ ] Create documentation for contributors (CONTRIBUTING.md) and update README with production setup instructions
- [ ] Conduct load testing with k6 or Locust to ensure system handles expected concurrent users
- [ ] Finalize release notes and publish MVP version (v0.1.0) to public

## 🐛 Bugs
- [ ] None currently tracked

## 💡 Future Ideas
- [ ] Template library: pre‑made storyboards for ads, tutorials, memes, etc.
- [ ] Real‑time collaboration: multiple users editing same storyboard (Yjs or Conflict‑free Replicated Data Type)
- [ ] Brand kits: upload custom fonts, logos, color palettes to apply across generated videos
- [ ] Multi‑language support: i18n UI (react‑i18next) and automatic subtitle translation
- [ ] Analytics dashboard: views, engagement, export counts per video
- [ ] API access: expose REST/OpenAPI endpoints for developers to generate videos programmatically
- [ ] Media library: upload custom images/audio to reuse across projects
- [ ] Advanced effects: motion tracking, green screen, AI‑based background removal
- [ ] Music & SFX library: royalty‑free tracks and sound effects with AI mood matching
- [ ] Export presets: optimized settings for YouTube, TikTok, Instagram, LinkedIn
- [ ] Offline mode: progressive web app with service workers for basic editing
- [ ] Educational mode: guided tutorials and tips for new users

## 📌 Notes
- Keep all changes in TypeScript; avoid `any` unless unavoidable (and document why).
- Every new service or component should have a corresponding placeholder or TODO comment until implemented.
- When integrating third‑party APIs, store credentials in `.env.local` (never commit) and reference via `process.env`.
- Follow the existing coding style: 2‑space imports, PascalCase for components, camelCase for functions and variables.
- Use absolute imports with `@/` prefix (configured in `tsconfig.json`).
- Ensure all new files are lint‑friendly; run `npm run lint` after creation.
- This checklist is a living document; update it as tasks are completed, added, or reprioritized.

--- 
*Task list generated based on PROJECT_CONTEXT.md and current repository state (2026‑07‑18).*