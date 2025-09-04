<template>
  <div class="min-h-screen flex flex-col relative overflow-hidden">


    <!-- Background Elements -->
    <BackgroundElements :scroll-y-progress="scrollYProgress" />

    <!-- Skip to main content link for accessibility -->
    <a href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50">
      Aller au contenu principal
    </a>

    <!-- Color Mode Switcher -->
    <header class="absolute top-4 left-4">
      <ClientOnly>
        <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="ghost" size="sm"
          :aria-label="isDark ? 'Passer au mode clair' : 'Passer au mode sombre'" @click="toggleColorMode" />
        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </header>

    <!-- Main Content - Centered -->
    <main id="main-content" class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="max-w-4xl w-full text-center space-y-8">
        <HeroSection />
      </div>
    </main>

    <!-- Footer -->
    <motion.footer class="py-6 text-center" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
      :transition="{ duration: 0.6, delay: 1.5, ease: 'easeOut' }">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        © {{ new Date().getFullYear() }} Reels Academy. Tous droits réservés.
      </p>
    </motion.footer>
  </div>
</template>

<script lang="ts" setup>
import { motion, useScroll } from 'motion-v'

// Scroll animations
const { scrollYProgress } = useScroll()

// No loading state needed anymore

// SEO Meta tags avec Nuxt SEO
useSeoMeta({
  title: 'Reels Academy - Crée du contenu simple en 4h/semaine',
  description: 'Pas besoin de caméra, pas besoin d\'y passer 10h. Avec ton téléphone et la bonne méthode, tu peux attirer plus de clients dès maintenant.',
  keywords: 'reels, contenu vidéo, marketing, indépendants, coiffeurs, esthéticiennes, artisans, coachs, formation',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Reels Academy - Crée du contenu simple en 4h/semaine',
  twitterDescription: 'Pas besoin de caméra, pas besoin d\'y passer 10h. Avec ton téléphone et la bonne méthode, tu peux attirer plus de clients dès maintenant.'
})

// Color mode management
const colorMode = useColorMode()

// Schema.org structured data
useSchemaOrg([
  defineWebSite({
    name: 'Reels Academy',
    url: 'https://reelsacademy.fr',
    description: 'Pas besoin de caméra, pas besoin d\'y passer 10h. Avec ton téléphone et la bonne méthode, tu peux attirer plus de clients dès maintenant.'
  }),
  defineOrganization({
    name: 'Reels Academy',
    url: 'https://reelsacademy.fr',
    logo: '/images/logo-light.png'
  })
])

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value: boolean) {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const toggleColorMode = () => {
  isDark.value = !isDark.value
}
</script>