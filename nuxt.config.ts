// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/image",
    "dayjs-nuxt",
    "nuxt-lodash",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
  ],
  css: ["~/assets/main.css"],
  ui: {
    icons: ["mdi", "fa6-solid", "fa6-regular", "fa6-brands"],
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      {
        code: "th",
        countryCode: "th",
        name: "ไทย",
        subName: "Thai",
        iso: "th-TH",
      },
      {
        code: "en",
        countryCode: "gb",
        name: "English",
        subName: "อังกฤษ",
        iso: "en-US",
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
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  colorMode: {
    preference: "light",
  },
  dayjs: {
    locales: ["en", "th"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Bangkok",
    plugins: ["utc", "timezone", "buddhistEra", "localeData"],
  },
  runtimeConfig: {
    apiSecret: "123",
    public: {
      webBase: "http://localhost:3000",
      apiBase: "http://localhost:5000",
      apiPath: "/api/",
    },
  },
});
