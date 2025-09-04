<template>
  <button :type="type" :disabled="disabled || loading" :aria-disabled="(disabled || loading) ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.99] font-medium dark:shadow-md dark:hover:shadow-lg"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      loading ? 'cursor-progress' : ''
    ]">
    <span v-if="loading" class="inline-flex items-center" role="status" aria-label="Chargement en cours">
      <svg class="animate-spin -ml-0.5 mr-1.5 text-current" :class="iconSizeClass" viewBox="0 0 24 24" fill="none"
        aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
      </svg>
    </span>

    <span v-else-if="leadingIcon" class="inline-flex items-center" aria-hidden="true">
      <UIcon :name="leadingIcon" :class="['-ml-0.5', iconSizeClass]" />
    </span>
    <slot v-else name="leading" />

    <span class="flex items-center">
      <slot />
    </span>

    <slot name="trailing" />
    <span v-if="trailingIcon" class="inline-flex items-center" aria-hidden="true">
      <UIcon :name="trailingIcon" :class="['-mr-0.5', iconSizeClass]" />
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'
  size: 'sm' | 'md' | 'lg' | 'xl'
  type: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  leadingIcon?: string
  trailingIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false
})

const variantClasses: Record<Props['variant'], string> = {
  // Solid high-contrast CTA (grayscale only)
  primary:
    'text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900',
  // Elevated neutral button (card-like)
  secondary:
    'text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800',
  // Subtle border, transparent background
  outline:
    'text-gray-900 border border-gray-300 bg-transparent hover:bg-gray-50 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
  // Minimal, hover elevation via bg only
  ghost:
    'bg-transparent text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800',
  // Glassmorphism, frosted effect
  glass:
    'text-gray-900 bg-white/60 backdrop-blur-md border border-gray-200 hover:bg-white/70 dark:text-gray-100 dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/15'
}

const sizeClasses: Record<Props['size'], string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-base'
}

const iconSizeBySize: Record<Props['size'], string> = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-5 h-5'
}

const { variant, size, type, loading, disabled, leadingIcon, trailingIcon } = toRefs(props)
const iconSizeClass = computed(() => iconSizeBySize[size.value])
</script>
