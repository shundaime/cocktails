<template>
  <button
    class="flex gap-1 items-center px-2 py-1 mx-auto text-xl bg-violet-500 rounded-lg border-2 transition duration-500 sm:text-2xl group border-neon-500 w-fit hover:bg-violet-400 hover:shadow-md hover:shadow-neon-500"
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
    onClick() {}
  }
}
</script>
