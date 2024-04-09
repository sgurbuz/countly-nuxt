// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-primevue',
  ],
  css: ['primeicons/primeicons.css', 'primeflex/primeflex.css'],
})
