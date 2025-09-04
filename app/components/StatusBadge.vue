<template>
    <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs sm:gap-2 sm:px-4 sm:py-2 sm:text-sm transition-all duration-300"
        role="status" :aria-label="`Statut: ${statusText}`" :class="[
            // Base styles
            'relative overflow-hidden',
            // Background and border
            'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
            'border border-gray-200/60 dark:border-gray-700/60',
            'shadow-sm hover:shadow-md',
            // Size variants
            sizeClasses[size],
            // Custom classes
            customClass
        ]">
        <!-- Animated background gradient -->
        <div
            class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        <!-- Status indicator -->
        <div class="relative flex items-center gap-2">
            <!-- Animated dot -->
            <motion.div
                class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 shadow-sm"
                :animate="{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                }" :transition="{
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity
                }" aria-hidden="true" />

            <!-- Text content -->
            <span class="relative font-medium tracking-wide">
                <slot />
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { motion } from 'motion-v';

interface Props {
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
    /** Custom CSS classes */
    customClass?: string
    /** Status text for accessibility */
    statusText?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    customClass: '',
    statusText: 'En cours'
})

// Size classes mapping
const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1 sm:px-3 sm:py-1.5 sm:gap-1.5',
    md: 'text-xs px-3 py-1.5 gap-1.5 sm:text-sm sm:px-4 sm:py-2 sm:gap-2',
    lg: 'text-sm px-4 py-2 gap-2 sm:text-base sm:px-5 sm:py-2.5 sm:gap-2.5'
}

const { statusText } = toRefs(props)
</script>
