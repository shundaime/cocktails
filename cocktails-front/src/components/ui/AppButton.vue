<template>
    <button
        class="flex items-center gap-1 px-2 py-1 mx-auto text-xl transition duration-500 border-2 rounded-lg bg-violet-500 disabled:opacity-80 sm:text-2xl group border-neon-500 w-fit hover:bg-violet-400 hover:shadow-md hover:shadow-neon-500"
        @click="onClick"
        :disabled="isDisabled"
    >
        {{ text }}
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{ text: string; isDisabled: boolean }>();

const emit = defineEmits<(e: 'action') => void>();

function onClick() {
    emit('action');
}
</script>
