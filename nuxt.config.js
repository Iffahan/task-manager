export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-task-manager',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  // Axios configuration
  axios: {
    baseURL: 'http://localhost:4000', // Set your API base URL here
    retry: { retries: 3 }, // Optional: retry configuration
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['axios'], // Ensures axios is transpiled to handle ESM properly
    extend(config) {
      config.resolve.extensions.push('.js', '.mjs');
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
    },
  },
};
