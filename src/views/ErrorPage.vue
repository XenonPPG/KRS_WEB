<script setup lang="ts">
const props = defineProps<{
  errorCode: number | string
  message: string
}>()
</script>

<template>
  <div class="flex-center flex-col flex-1">
    <h1 class="font-secondary text-[120px] animate-bounce">{{ errorCode }}</h1>
    <h3>{{ message }}</h3>
  </div>
</template>