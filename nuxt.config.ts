// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "motion-v/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  // Site configuration for SEO
  site: {
    url: "https://tooka.io",
    name: "Tooka",
    description:
      "La plateforme qui accompagne les créatifs du brief initial à la livraison finale. Gérez vos projets clients sans stress, avec style.",
    defaultLocale: "fr",
  },

  // Performance & SEO
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },

  // OG Image configuration
  ogImage: {
    componentOptions: {
      global: true,
    },
  },

  // Image optimization
  image: {
    quality: 80,
    format: ["webp", "avif", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Runtime config for environment variables
  runtimeConfig: {
    klaviyoPrivateKey: process.env.KLAVIYO_PRIVATE_KEY,
    klaviyoListId: process.env.KLAVIYO_LIST_ID,
  },
});
