// import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'ログボ for Misskey',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+JP|Concert+One&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,700'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/earlyaccess/nicomoji.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuetify', '~/plugins/firebase'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['@/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#f44336',
          secondary: '#8bc34a',
          accent: '#9c27b0',
          error: '#ff5722',
          warning: '#ffc107',
          info: '#009688',
          success: '#03a9f4'
        },
        light: {
          primary: '#f44336',
          secondary: '#8bc34a',
          accent: '#9c27b0',
          error: '#ff5722',
          warning: '#ffc107',
          info: '#009688',
          success: '#03a9f4'
        }
      }
    },
    defaultAssets: {
      font: {
        family:
          '-apple-system, BlinkMacSystemFont, Roboto, "游ゴシック体", YuGothic, "Yu Gothic Medium", sans-serif',
        size: 20
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend({ _config, _ctx }: { _config: any; _ctx: any }) {}
  }
}
