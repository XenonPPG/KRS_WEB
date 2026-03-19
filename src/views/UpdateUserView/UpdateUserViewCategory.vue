<script setup lang="ts">
const props = defineProps<{
  category: string
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="w-full border-b-3 pb-2 min-w-150">
      <h2>
        {{ props.category }}
      </h2>
    </div>

    <div class="flex flex-col w-min min-w-70 gap-3">
      <slot/>
    </div>
  </div>
</template>