<template>
  <button
    class="flex items-center gap-1 px-2 py-1 mx-auto text-2xl transition duration-500 border-2 rounded-lg bg-violet-500 group border-neon-500 w-fit hover:bg-violet-400 hover:shadow-md hover:shadow-neon-500"
    @click="onClick"
  >
    {{ text }}
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick() {
      // Add your button click logic here
    }
  }
}
</script>
