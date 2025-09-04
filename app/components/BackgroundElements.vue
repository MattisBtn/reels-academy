<template>
    <div class="absolute inset-0 -z-10">
        <!-- Gradient Background -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800" />

        <!-- Animated Grid Pattern -->
        <div
            class="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] animate-pulse opacity-30" />

        <!-- Floating Geometric Shapes -->
        <motion.div
            class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/20 rounded-full blur-xl animate-float opacity-60"
            :style="{ y: shapesY }" />
        <motion.div
            class="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-lg animate-float-delayed opacity-50"
            :style="{ y: shapes2Y }" />
        <motion.div
            class="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-100 to-pink-100 dark:from-amber-900/20 dark:to-pink-900/20 rounded-full blur-2xl animate-float-slow opacity-40"
            :style="{ y: shapes3Y }" />
        <motion.div
            class="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-full blur-xl animate-float opacity-30"
            :style="{ y: shapes4Y }" />

        <!-- Subtle Noise Texture -->
        <div class="absolute inset-0 opacity-[0.015] noise-texture" />
    </div>
</template>

<script lang="ts" setup>
import { motion, useTransform } from 'motion-v';

interface Props {
    scrollYProgress: MotionValue<number>
}

const props = defineProps<Props>()

const shapesY = useTransform(props.scrollYProgress, [0, 1], ['0%', '30%'])
const shapes2Y = useTransform(props.scrollYProgress, [0, 1], ['0%', '20%'])
const shapes3Y = useTransform(props.scrollYProgress, [0, 1], ['0%', '-10%'])
const shapes4Y = useTransform(props.scrollYProgress, [0, 1], ['0%', '-15%'])
</script>
