<template>
    <div class="max-w-4xl w-full text-center space-y-8">
        <!-- Logo -->
        <motion.div class="flex justify-center" :initial="{ opacity: 0, y: -20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.1, ease: 'easeOut' }">
            <ClientOnly>
                <NuxtImg :src="isDark ? '/images/logo2-dark.png' : '/images/logo2-light.png'"
                    alt="Reels Academy - Logo de la plateforme créative" class="h-12 w-auto" />
                <template #fallback>
                    <div class="h-12 w-auto" />
                </template>
            </ClientOnly>
        </motion.div>

        <!-- Badge -->
        <motion.div :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.6, delay: 0.3, ease: 'easeOut' }">
            <StatusBadge size="lg" status-text="Rejoindre l'academie"
                class="mx-auto text-gray-700 dark:text-gray-300 font-semibold">
                Rejoindre l'academie
            </StatusBadge>
        </motion.div>

        <!-- Title -->
        <h1 class="text-5xl md:text-7xl font-medium tracking-tight text-gray-900 dark:text-white">
            <motion.span class="inline-block" :initial="{ opacity: 0, filter: 'blur(10px)', y: 20 }"
                :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                :transition="{ duration: 0.8, delay: 0.5, ease: 'easeOut' }">
                Créez
            </motion.span>
            {{ ' ' }}
            <motion.span class="inline-block" :initial="{ opacity: 0, filter: 'blur(10px)', y: 20 }"
                :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }">
                du
            </motion.span>
            {{ ' ' }}
            <motion.span class="inline-block" :initial="{ opacity: 0, filter: 'blur(10px)', y: 20 }"
                :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                :transition="{ duration: 0.8, delay: 0.7, ease: 'easeOut' }">
                contenu
            </motion.span>
            {{ ' ' }}
            <motion.span class="inline-block" :initial="{ opacity: 0, filter: 'blur(10px)', y: 20 }"
                :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                :transition="{ duration: 0.8, delay: 0.8, ease: 'easeOut' }">
                simple
            </motion.span>
            <br>
            <motion.span class="font-serif font-normal italic text-gray-600 dark:text-gray-400 inline-block"
                :initial="{ opacity: 0, filter: 'blur(8px)', y: 15 }"
                :animate="{ opacity: 1, filter: 'blur(0px)', y: 0 }"
                :transition="{ duration: 1, delay: 0.9, ease: 'easeOut' }">
                en seulement <span class="text-yellow-500">4h/semaine</span>.
            </motion.span>
        </h1>

        <!-- Subtitle -->
        <motion.div class="max-w-2xl mx-auto" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 1.0, ease: 'easeOut' }">
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Pas besoin de caméra, pas besoin d'y passer 10h, pas besoin d'être un expert. Avec ton téléphone et la
                bonne
                méthode, tu peux attirer plus de clients dès maintenant.
            </p>
        </motion.div>

        <!-- Benefits List -->
        <motion.div class="max-w-3xl mx-auto" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 1.1, ease: 'easeOut' }">
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div class="flex items-center gap-3 group">
                    <div
                        class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <UIcon name="i-lucide-smartphone" class="w-5 h-5 text-white" />
                    </div>
                    <div class="text-left">
                        <div class="font-medium text-gray-900 dark:text-white text-sm">Juste ton smartphone</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Pas besoin de matériel pro</div>
                    </div>
                </div>

                <div class="flex items-center gap-3 group">
                    <div
                        class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <UIcon name="i-lucide-clock" class="w-5 h-5 text-white" />
                    </div>
                    <div class="text-left">
                        <div class="font-medium text-gray-900 dark:text-white text-sm">4h/semaine max</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Méthode ultra-efficace</div>
                    </div>
                </div>

                <div class="flex items-center gap-3 group">
                    <div
                        class="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-white" />
                    </div>
                    <div class="text-left">
                        <div class="font-medium text-gray-900 dark:text-white text-sm">Plus de clients</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Résultats garantis</div>
                    </div>
                </div>
            </div>
        </motion.div>

        <!-- Email Form -->
        <motion.div class="max-w-lg mx-auto" :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 1.2, ease: 'easeOut' }">
            <form class="space-y-6" role="form" aria-labelledby="waitlist-title" @submit.prevent="joinWaitlist">
                <h2 id="waitlist-title" class="sr-only">Rejoindre la liste d'attente</h2>
                <motion.div class="flex flex-col sm:flex-row gap-3 sm:gap-4" :initial="{ opacity: 0, scale: 0.95 }"
                    :animate="{ opacity: 1, scale: 1 }" :transition="{ duration: 0.6, delay: 1.4, ease: 'easeOut' }">
                    <UInput v-model="email" type="email" placeholder="Entrez votre adresse email" class="flex-1"
                        color="neutral" variant="outline" size="lg" :ui="{
                            base: 'h-12 sm:h-14 text-sm sm:text-base placeholder:text-gray-400 dark:placeholder:text-gray-500'
                        }" aria-label="Adresse email pour rejoindre la liste d'attente" required />
                    <Button type="submit" variant="glass" size="lg" :loading="loading"
                        class="h-12 sm:h-14 text-sm sm:text-base" trailing-icon="i-lucide-arrow-up-right"
                        :aria-label="loading ? 'Inscription en cours...' : 'Rejoindre la liste d\'attente'">
                        <span v-if="!loading">Je veux rejoindre la liste</span>
                        <span v-else>Inscription...</span>
                    </Button>
                </motion.div>

                <!-- Trust indicator -->
                <motion.p class="text-xs text-gray-500 dark:text-gray-400 text-center" :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }" :transition="{ duration: 0.5, delay: 1.5, ease: 'easeOut' }">
                    ✨ Pas de spam, promis. Désinscription en un clic.
                </motion.p>
            </form>
        </motion.div>

        <!-- Reassurance Section -->
        <motion.div class="max-w-2xl mx-auto mt-8" :initial="{ opacity: 0, y: 15 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 1.6, ease: 'easeOut' }">
            <div class="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center gap-2">
                    <div
                        class="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                        <span class="text-white text-xs font-bold">✓</span>
                    </div>
                    <span>Déjà +20 indépendants accompagnés</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                        <span class="text-white text-xs font-bold">✓</span>
                    </div>
                    <span>Coiffeurs, esthéticiennes, artisans, coachs…</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                        <span class="text-white text-xs font-bold">✓</span>
                    </div>
                    <span>100% adapté aux débutants</span>
                </div>
            </div>
        </motion.div>
    </div>
</template>

<script lang="ts" setup>
import { motion } from 'motion-v';

// No props needed anymore

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Form state
const email = ref('')
const loading = ref(false)

const router = useRouter()

const joinWaitlist = async () => {
    if (!email.value) return

    loading.value = true

    try {
        await $fetch<{ success: boolean; message: string }>('/api/klaviyo/subscribe', {
            method: 'POST',
            body: { email: email.value }
        })

        // Redirect to thank you page
        await router.push('/thank-you')
    } catch (error: unknown) {
        console.error('Error joining waitlist:', error)

        const toast = useToast()
        const errorMessage = error && typeof error === 'object' && 'data' in error
            ? (error.data as { statusMessage?: string })?.statusMessage
            : 'Une erreur est survenue. Veuillez réessayer.'

        toast.add({
            title: 'Erreur lors de l\'inscription',
            description: errorMessage,
            color: 'error',
            icon: 'i-lucide-alert-circle'
        })
    } finally {
        loading.value = false
    }
}
</script>
