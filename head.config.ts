import type { MetaObject } from "nuxt/schema";

export default {
  htmlAttrs: {
    class: "notranslate",
    translate: "no",
  },
  titleTemplate: (titleChunk: string) => {
    return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "msapplication-TileColor",
      content: process.env.NUXT_THEME_COLOR,
    },
    {
      name: "msapplication-TileImage",
      content: "/icons/ms-icon-144x144.png",
    },
    { name: "theme-color", content: process.env.NUXT_THEME_COLOR },
    { name: "google", content: "notranslate" },
    {
      name: "google-site-verification",
      content: process.env.NUXT_GOOGLE_SITE_VERIFICATION,
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/icons/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/icons/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/icons/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/icons/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/icons/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/icons/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/icons/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/icons/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/icons/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/icons/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "36x36",
      href: "/icons/android-icon-36x36.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      href: "/icons/android-icon-48x48.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/icons/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "70x70",
      href: "/icons/ms-icon-70x70.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "150x150",
      href: "/icons/ms-icon-150x150.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "310x310",
      href: "/icons/ms-icon-310x310.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/icons/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/icons/favicon-16x16.png",
    },
  ],
} as MetaObject;
