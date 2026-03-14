<script setup lang="ts">
import WithTooltip from "@/components/customUI/WithTooltip.vue";

const props = defineProps<{
  link: string,
  title: string
}>()
</script>

<template>
  <WithTooltip :text="props.link" :side="'right'" :delay="0">
    <a :href="props.link"
       target="_blank"
       class="flex-center items-start justify-start gap-2 whitespace-nowrap w-full">
      <span>{{ props.title }}</span>
    </a>
  </WithTooltip>
</template>