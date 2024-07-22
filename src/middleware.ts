import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/unprotected-route",
  "/",
  "/redirect",
]);

export default clerkMiddleware(
  (auth, req) => {
    if (!isPublicRoute(req)) {
      auth().protect();
    } else if (req.nextUrl.pathname.includes("redirect")) {
      return auth().redirectToSignIn();
    } else {
      console.log(auth());
      return NextResponse.next();
    }
  },
  { debug: true },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
