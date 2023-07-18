<template>
    <div
        class="absolute top-0 right-0 flex flex-col items-center justify-center w-full h-full gap-4 text-4xl text-center bg-neutral-900"
    >
        <h2>Oups !</h2>
        {{ text }}
    </div>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
