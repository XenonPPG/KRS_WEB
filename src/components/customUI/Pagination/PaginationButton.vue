<script setup lang="ts">
import {Button} from "@/components/ui/button";

const props = defineProps<{
  index: number
  selectedIndex: number
}>()

const emit = defineEmits<{
  (event: 'select', index: number): void
}>();
</script>

<template>
  <div class="pb-2 border-b-2 mt-2" :class="{'border-transparent':props.selectedIndex !== props.index}">
    <Button @click="emit('select', index)" size="icon" variant="outline">{{ index }}</Button>
  </div>
</template>