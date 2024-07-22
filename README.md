## Cloudflare Pages + Clerk Core 2 + NextJS 14 - 500 Error Reproduction

Thread: https://discord.com/channels/856971667393609759/1264981867459907605

Project created with Cloudflare C3 CLI tool and middleware added per Clerk [Quick Start Guide](https://clerk.com/docs/quickstarts/nextjs)

To reproduce:
- Ensure your Clerk secrets are both in `.env.local` and `.dev.vars`
- Run the project with the wrangler runtime `pnpm preview`
- Try the following to break it:
    - DevTools > Application > Clear site data
    - Navigate between pages quickly
    - Sign-in
    - Navigate between pages quickly and rapidly refresh

Notes:
- It does seem like this is related to session expiration or rate limiting in some form given that its intermitent and depends on auth state to get into this unrecoverable 500 state.

```shell
[wrangler:inf] HEAD /_next/data/8xoGcWhE4J0W28A9o5cdF/protected-route.json 500 Internal Server Error (11ms)
✘ [ERROR] TypeError: Cannot read properties of undefined (reading 'default')

      at Module.<anonymous>
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:43:10898)
      at E
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:15587)
      at async M.runRouteMiddleware
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:22296)
      at async M.checkRoute
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:24391)
      at async M.checkPhase
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:25237)
      at async M.run
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:25906)
      at async ee
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:26186)
      at async Y
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/index.js:40:26115)
      at async jsonError
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/node_modules/.pnpm/wrangler@3.65.1_@cloudflare+workers-types@4.20240718.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts:22:10)
      at async drainBody
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/node_modules/.pnpm/wrangler@3.65.1_@cloudflare+workers-types@4.20240718.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts:5:10)
```
![image](https://github.com/user-attachments/assets/a8b9e993-3d46-40cf-b7d6-d490a5941836)

```shell
[wrangler:inf] GET /unprotected-route 200 OK (14ms)
[clerk debug start: clerkMiddleware]
[clerk debug end: clerkMiddleware] (@clerk/nextjs=5.2.4,next=14.2.5)
✘ [ERROR] Error: Disallowed operation called within global scope. Asynchronous I/O (ex: fetch() or connect()), setting a timeout, and generating random values are not allowed within global scope. To fix this error, perform this operation within a handler. https://developers.cloudflare.com/workers/runtime-apis/handlers/

      at s
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/webpack/28f61fdd5f6883c02f5da60d65410cf7.js:1:32978)
      at Sa.Ee
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:22:9519)
      at Sa.xe
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:22:9146)
      at Sa.record
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:22:8785)
      at null.<anonymous>
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:42:3932)
      at null.<anonymous>
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:42:3906)
      at Ya
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:42:6143)
      at 2399
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:42:7470)
      at e
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/protected-route.func.js:1:12894)
      at null.<anonymous>
  (file:///Users/kaleb/Development/scratch/fragrant-mode-f822/.vercel/output/static/_worker.js/__next-on-pages-dist__/functions/src/middleware.func.js:43:9343)
```
![image](https://github.com/user-attachments/assets/bf67fbaa-b5de-4555-a46d-72fd6df01915)

This error also shows up occasionally. It will also happen if Clerk Middleware is missing secrets.

![image](https://github.com/user-attachments/assets/b3029a67-56a0-4af9-a087-1c1c4b5bfa2e)
