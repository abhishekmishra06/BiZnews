// export default {
//   modules: [
//     '@nuxtjs/axios', // Make sure you have installed this
//     '@nuxtjs/tailwindcss',
//   ],

//   axios: {
//     baseURL: 'https://your-api-url.com',
//   },

//   tailwindcss: {
//     cssPath: '@/assets/css/tailwind.css',
//   },

//   build: {
//     // Add build configuration if necessary
//   },
// }



// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: true }
// })
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css'
  ]
})