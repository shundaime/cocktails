<template>
    <div class="flex absolute top-0 left-0 z-20 gap-4 justify-center items-center m-auto w-full h-full text-4xl font-bold rounded-md opacity-60 bg-neutral-900">
      Loading...
      <ph-circle-notch :size="32" weigt="bold" color="#04d9ff" class="spinner" />
    </div>
  </template>
  
  <script lang='ts'>
  export default {
    name: 'v-Loader',
  };
  </script>
