// https://nuxt.com/docs/api/configuration/nuxt-config
import headConfig from "./head.config";

const nodeEnv =
  process.env.NUXT_NODE_ENV === "development" ? "development" : "production";

export default defineNuxtConfig({
  devtools: { enabled: nodeEnv === "development" },
  app: {
    head: headConfig,
  },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/image",
    "dayjs-nuxt",
    "nuxt-lodash",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "nuxt-tiptap-editor",
    "@nuxtjs/robots",
    "@vite-pwa/nuxt",
  ],
  css: ["~/assets/main.css"],
  ui: {
    icons: ["mdi", "fa6-solid", "fa6-regular", "fa6-brands"],
  },
  image: {
    providers: {
      myProvider: {
        name: "api", // optional value to overrider provider name
        provider: "~/providers/my-provider.ts", // Path to custom provider
        options: {
          baseURL: process.env.NUXT_PUBLIC_API_BASE,
        },
      },
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        countryCode: "us",
        name: "English",
        subName: "อังกฤษ",
        iso: "en-US",
      },
      {
        code: "th",
        countryCode: "th",
        name: "ไทย",
        subName: "Thai",
        iso: "th-TH",
      },
    ],
    vueI18n: "./i18n.config.ts",
  },
  googleFonts: {
    families: {
      Sarabun: true,
      "Noto+Sans+Thai": true,
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  colorMode: {
    preference: "light",
  },
  dayjs: {
    locales: ["en", "th"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Bangkok",
    plugins: ["utc", "timezone", "buddhistEra", "localeData", "relativeTime"],
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  pwa: {
    manifest: {
      name: process.env.NUXT_PUBLIC_APP_NAME,
      short_name: process.env.NUXT_PUBLIC_APP_NAME,
      description: "",
      theme_color: "#ffffff",
      icons: [
        {
          type: "image/png",
          sizes: "36x36",
          src: "/icons/android-icon-36x36.png",
        },
        {
          type: "image/png",
          sizes: "48x48",
          src: "/icons/android-icon-48x48.png",
        },
        {
          type: "image/png",
          sizes: "192x192",
          src: "/icons/android-icon-192x192.png",
        },
        {
          type: "image/png",
          sizes: "70x70",
          src: "/icons/ms-icon-70x70.png",
        },
        {
          type: "image/png",
          sizes: "150x150",
          src: "/icons/ms-icon-150x150.png",
        },
        {
          type: "image/png",
          sizes: "310x310",
          src: "/icons/ms-icon-310x310.png",
        },
        {
          type: "image/png",
          sizes: "32x32",
          src: "/icons/favicon-32x32.png",
        },
        {
          type: "image/png",
          sizes: "96x96",
          src: "/icons/favicon-96x96.png",
        },
        {
          type: "image/png",
          sizes: "16x16",
          src: "/icons/favicon-16x16.png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: false,
      type: "module",
    },
  },
  robots: [
    {
      UserAgent: "Googlebot",
      Disallow: "/backend",
    },
    {
      UserAgent: "*",
      Disallow: "/backend",
    },
  ],
  runtimeConfig: {
    metaDefaultLang: "en",
    metaDefaultTitle: "",
    metaDefaultDescription: "",
    metaDefaultKeywords: "",
    metaDefaultUrl: "",
    metaDefaultSiteName: "",
    metaDefaultImage: "",
    public: {
      appName: "App Name",
      webBase: "http://localhost:3000",
      apiBase: "http://localhost:5000",
      apiPath: "/api/",
    },
  },
});
