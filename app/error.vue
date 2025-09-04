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
            <div class="max-w-2xl w-full text-center space-y-8">
                <!-- Logo -->
                <motion.div class="flex justify-center" :initial="{ opacity: 0, y: -20 }"
                    :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.8, ease: 'easeOut' }">
                    <ClientOnly>
                        <NuxtImg :src="isDark ? '/images/logo2-dark.png' : '/images/logo2-light.png'"
                            alt="Reels Academy - Logo de la plateforme créative" class="h-12 w-auto" />
                        <template #fallback>
                            <div class="h-12 w-auto" />
                        </template>
                    </ClientOnly>
                </motion.div>

                <!-- Error Code -->
                <motion.div :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }">
                    <h1 class="text-8xl md:text-9xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {{ error?.statusCode || 500 }}
                    </h1>
                </motion.div>

                <!-- Error Message -->
                <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.7, delay: 0.4, ease: 'easeOut' }">
                    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
                        {{ getErrorMessage() }}
                    </h2>
                    <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {{ getErrorDescription() }}
                    </p>
                </motion.div>

                <!-- Action Buttons -->
                <motion.div class="flex flex-col sm:flex-row gap-4 justify-center" :initial="{ opacity: 0, y: 30 }"
                    :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }">
                    <Button variant="primary" size="lg" leading-icon="i-lucide-home" type="button" @click="handleError">
                        Retour à l'accueil
                    </Button>
                    <Button variant="outline" size="lg" leading-icon="i-lucide-arrow-left" type="button"
                        @click="goBack">
                        Retour en arrière
                    </Button>
                </motion.div>

                <!-- Help Text -->
                <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                    :transition="{ duration: 0.5, delay: 0.8, ease: 'easeOut' }">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Si le problème persiste, contactez-nous à
                        <a href="mailto:contact@reelsacademy.fr"
                            class="text-amber-600 dark:text-amber-400 hover:underline">
                            contact@reelsacademy.fr
                        </a>
                    </p>
                </motion.div>
            </div>
        </main>

        <!-- Footer -->
        <motion.footer class="py-6 text-center" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
            :transition="{ duration: 0.6, delay: 1.0, ease: 'easeOut' }">
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

// Error handling
const error = useError()

// Color mode management
const colorMode = useColorMode()

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

// Error message mapping
const getErrorMessage = () => {
    const statusCode = error.value?.statusCode || 500

    switch (statusCode) {
        case 404:
            return 'Page introuvable'
        case 403:
            return 'Accès refusé'
        case 500:
            return 'Erreur serveur'
        case 503:
            return 'Service indisponible'
        default:
            return 'Une erreur est survenue'
    }
}

const getErrorDescription = () => {
    const statusCode = error.value?.statusCode || 500

    switch (statusCode) {
        case 404:
            return 'La page que vous recherchez n\'existe pas ou a été déplacée.'
        case 403:
            return 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.'
        case 500:
            return 'Une erreur interne s\'est produite. Nos équipes ont été notifiées.'
        case 503:
            return 'Le service est temporairement indisponible. Veuillez réessayer plus tard.'
        default:
            return 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
    }
}

// Navigation handlers
const handleError = () => {
    clearError({ redirect: '/' })
}

const goBack = () => {
    if (import.meta.client) {
        window.history.back()
    }
}

// SEO Meta tags
useSeoMeta({
    title: `Erreur ${error.value?.statusCode || 500} - Reels Academy`,
    description: 'Une erreur est survenue. Retournez à l\'accueil de Reels Academy.',
    robots: 'noindex, nofollow'
})
</script>
