<script setup lang="ts">
import WithLabel from "@/components/customUI/WithLabel.vue";
import { Input } from "@/components/ui/input";

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  label: string
}>()
</script>

<template>
  <WithLabel :label="label" position="top">
    <Input v-bind="$attrs"/>
  </WithLabel>
</template>