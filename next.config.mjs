import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Keep local development running while a production build writes its own cache.
export default function config(phase) {
  return {
    reactStrictMode: true,
    poweredByHeader: false,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
