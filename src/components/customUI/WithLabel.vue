<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  label: string,
  position: 'left' | 'right' | 'top' | 'bottom',
  labelClass?: HTMLAttributes['class']
}>()

function IsPos(positionName: string): boolean {
  return props.position == positionName
}
</script>

<template>
<div class="flex gap-1" :class="{'flex-col':IsPos('top') || IsPos('bottom')}">
  <template v-if="IsPos('left') || IsPos('top')">
    <label :class="labelClass">{{ props.label }}</label>
  </template>

  <slot/>

  <template v-if="IsPos('right') || IsPos('bottom')">
    <label :class="labelClass">{{ props.label }}</label>
  </template>
</div>
</template>