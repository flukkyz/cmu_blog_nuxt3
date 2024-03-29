// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/eslint", "@nuxt/image"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  colorMode: {
    preference: "light",
  },
});
