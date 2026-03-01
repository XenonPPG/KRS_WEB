<script setup lang="ts">
import {computed, ref} from "vue";

const isHovered = ref(false)
const style = computed(() => isHovered.value ? 'text-primary' : '')
</script>

<template>
  <p class="whitespace-nowrap transition-colors select-none"
     @pointerenter="isHovered = true"
     @pointerleave="isHovered = false">

    Made for <span :class="style">k</span>u<span :class="style">rs</span>ovaya with
  </p>
</template>