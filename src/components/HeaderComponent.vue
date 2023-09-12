<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="text-xl font-bold mb-2">
    <h1 v-if="title">
      {{ title }}
    </h1>
    <slot></slot>
  </div>
</template>
