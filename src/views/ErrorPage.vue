<script setup lang="ts">
const props = defineProps<{
  errorCode: number | string
  message: string
}>()
</script>

<template>
<h1 class="font-secondary text-[120px] animate-bounce">{{ errorCode }}</h1>
  <h3>{{ message }}</h3>
</template>