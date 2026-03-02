<script setup lang="ts">
import {computed, ref} from "vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const isHovered = ref(false)
const style = computed(() => 'transition-colors ' + (isHovered.value ? 'text-primary' : ''))
</script>

<template>
  <div class="flex-center gap-[0.5ch] text-muted-foreground/50"
       @pointerenter="isHovered = true"
       @pointerleave="isHovered = false">
    <p class="whitespace-nowrap select-none">
      Made for <span :class="style">k</span>u<span :class="style">rs</span>ovaya with
    </p>
    <SafeIcon icon="tabler:heart-filled" :class="style"/>
  </div>
</template>