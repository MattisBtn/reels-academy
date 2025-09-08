<template>
    <motion.div class="text-center" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.5, ease: 'easeOut' }">
        <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
            <motion.div class="w-2 h-2 bg-green-500 rounded-full" :animate="{ scale: [1, 1.2, 1] }"
                :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                <span class="mr-1">Tu es le</span>
                <motion.span :key="count" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }">
                    <motion.span :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.5 }">
                        {{ displayCount }}ème
                    </motion.span>
                </motion.span>
                <span>indépendant(s) inscrit(s)</span>
            </span>
        </div>
    </motion.div>
</template>

<script lang="ts" setup>
import { motion } from 'motion-v';

interface Props {
    initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
    initialCount: 21
})

const count = ref(props.initialCount)
const displayCount = ref(0)

// Animate from 0 to initial count after component appears
onMounted(() => {
    // Wait for the component to appear (1.0s delay + 0.8s duration = 1.8s total)
    setTimeout(() => {
        const startValue = 0
        const endValue = props.initialCount
        const duration = 1500 // 1.5 seconds

        const startTime = Date.now()
        const animateNumber = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function (easeOut)
            const easeOut = 1 - Math.pow(1 - progress, 3)

            displayCount.value = Math.round(startValue + (endValue - startValue) * easeOut)

            if (progress < 1) {
                requestAnimationFrame(animateNumber)
            }
        }

        requestAnimationFrame(animateNumber)
    }, 500)
})

// Animate the number when count changes
watch(count, (newCount) => {
    const startValue = displayCount.value
    const endValue = newCount
    const duration = 800 // 0.8 seconds

    const startTime = Date.now()
    const animateNumber = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function (easeOut)
        const easeOut = 1 - Math.pow(1 - progress, 3)

        displayCount.value = Math.round(startValue + (endValue - startValue) * easeOut)

        if (progress < 1) {
            requestAnimationFrame(animateNumber)
        }
    }

    requestAnimationFrame(animateNumber)
})

// Simulate real-time updates (optional)
onMounted(() => {
    // You can replace this with real API calls to get live count
    const interval = setInterval(() => {
        // Simulate occasional new signups
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            count.value += 1
        }
    }, 30000) // Check every 30 seconds

    onUnmounted(() => {
        clearInterval(interval)
    })
})
</script>
