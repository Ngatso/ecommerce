/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["yet-another-react-lightbox"],
  tailwind: true,
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.ts"
      : undefined,
  serverBuildPath: ".netlify/functions-internal/server.js",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  serverModuleFormat: "cjs",
  future: {
    v2_errorBoundary: false,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
