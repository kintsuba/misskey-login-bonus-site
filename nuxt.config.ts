// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-09-14",

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxtjs/google-fonts"],
});