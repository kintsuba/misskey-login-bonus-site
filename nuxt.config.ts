import { databaseURL } from "firebase-functions/params";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-09-14",

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxtjs/google-fonts", "nuxt-vuefire"],

  googleFonts: {
    families: {
      "Cherry+Bomb+One": true,
    },
    display: "swap",
    text: "ログボ！",
  },

  vuefire: {
    config: {
      apiKey: "AIzaSyDYyN8Tl4vSpil1r1xdlTqVEDoaxzBrMMY",
      authDomain: "misskey-login-bonus.firebaseapp.com",
      databaseURL: "https://misskey-login-bonus.firebaseio.com",
      projectId: "misskey-login-bonus",
      storageBucket: "misskey-login-bonus.appspot.com",
      messagingSenderId: "1046728037357",
      appId: "1:1046728037357:web:b258db2dc4c5148215cde4",
    },
  },
});
