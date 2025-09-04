<template>
    <div class="min-h-screen flex flex-col relative overflow-hidden">
        <!-- Background Elements -->
        <BackgroundElements :scroll-y-progress="scrollYProgress" />

        <!-- Skip to main content link for accessibility -->
        <a href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50">
            Aller au contenu principal
        </a>

        <!-- Header with Logo and Color Mode -->
        <header class="absolute top-4 left-4 right-4 flex items-center justify-between">
            <!-- Logo -->
            <motion.div class="flex items-center" :initial="{ opacity: 0, x: -20 }" :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.6, delay: 0.3, ease: 'easeOut' }">
                <NuxtImg src="/images/logo2-light.png" alt="Reels Academy" class="h-8 w-auto dark:hidden" />
                <NuxtImg src="/images/logo2-dark.png" alt="Reels Academy" class="h-8 w-auto hidden dark:block" />
            </motion.div>

            <!-- Color Mode Switcher -->
            <ClientOnly>
                <motion.div :initial="{ opacity: 0, x: 20 }" :animate="{ opacity: 1, x: 0 }"
                    :transition="{ duration: 0.6, delay: 0.5, ease: 'easeOut' }">
                    <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="ghost" size="sm"
                        :aria-label="isDark ? 'Passer au mode clair' : 'Passer au mode sombre'"
                        @click="toggleColorMode" />
                </motion.div>
                <template #fallback>
                    <div class="size-8" />
                </template>
            </ClientOnly>
        </header>

        <!-- Main Content - Centered -->
        <main id="main-content" class="flex-1 flex items-center justify-center px-4 py-6 md:py-8">
            <div class="max-w-2xl w-full text-center space-y-8 md:space-y-12">
                <!-- Success Animation -->
                <motion.div class="flex justify-center" :initial="{ opacity: 0, scale: 0.5 }"
                    :animate="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.8, ease: 'easeOut' }">
                    <div class="relative">
                        <!-- Animated checkmark circle -->
                        <motion.div
                            class="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
                            :initial="{ scale: 0, rotate: -180 }" :animate="{ scale: 1, rotate: 0 }"
                            :transition="{ duration: 0.6, delay: 0.2, ease: 'backOut' }"
                            :while-hover="{ scale: 1.05, rotate: 5 }"
                            :transition-hover="{ duration: 0.3, ease: 'easeOut' }">
                            <motion.div class="text-white" :initial="{ opacity: 0, scale: 0 }"
                                :animate="{ opacity: 1, scale: 1 }"
                                :transition="{ duration: 0.4, delay: 0.6, ease: 'easeOut' }">
                                <motion.div :animate="{
                                    scale: [1, 1.05, 1]
                                }" :transition="{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }">
                                    <UIcon name="i-lucide-check" class="w-8 h-8 md:w-12 md:h-12 mt-1 md:mt-2" />
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <!-- Ripple effect -->
                        <motion.div class="absolute inset-0 rounded-full border-4 border-green-500/30"
                            :initial="{ scale: 0.8, opacity: 1 }" :animate="{ scale: 2, opacity: 0 }"
                            :transition="{ duration: 1.5, delay: 0.8, ease: 'easeOut' }" />
                    </div>
                </motion.div>

                <!-- Thank You Message -->
                <motion.div :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }">
                    <h1
                        class="text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6">
                        <motion.span class="inline-block" :initial="{ opacity: 0, filter: 'blur(10px)', y: 20 }"
                            :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                            :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }">
                            Merci !
                        </motion.span>
                    </h1>

                    <motion.p
                        class="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto"
                        :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.8, delay: 0.8, ease: 'easeOut' }">
                        Vous êtes maintenant inscrit à notre liste d'attente. Nous vous tiendrons au courant dès que
                        la Reels Academy sera disponible !
                    </motion.p>
                </motion.div>

                <!-- Live Counter -->
                <motion.div class="pt-6 md:pt-8" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                    :transition="{ duration: 0.8, delay: 1.0, ease: 'easeOut' }">
                    <WaitlistCounter :initial-count="22" />
                </motion.div>
            </div>
        </main>

        <!-- Footer -->
        <motion.footer class="py-6 text-center" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
            :transition="{ duration: 0.6, delay: 1.8, ease: 'easeOut' }">
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

// Color mode management
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
}

// SEO Meta tags
useSeoMeta({
    title: 'Merci ! - Reels Academy',
    description: 'Merci de vous être inscrit à notre liste d\'attente. Vous serez parmi les premiers à découvrir la Reels Academy !',
    robots: 'noindex, nofollow'
})
</script>
