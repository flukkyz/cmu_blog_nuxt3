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
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  colorMode: {
    preference: "light",
  },
  dayjs: {
    locales: ["en", "th"],
    defaultLocale: "th",
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
