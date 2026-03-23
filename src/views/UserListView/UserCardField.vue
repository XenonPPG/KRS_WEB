<script setup lang="ts">
import CopyText from "@/components/customUI/CopyText.vue";
import {ref} from "vue";

const props = defineProps<{
  value: any
}>()

const isHovering = ref(false)
</script>

<template>
  <CopyText
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
      class="font-secondary z-10"
      :text="value.val"
      align-button="left"/>
  <p v-if="value.names"
     class="text-xs absolute right-10 whitespace-nowrap text-muted-foreground transition-opacity"
     :class="{'opacity-0': isHovering}">
    ({{ value.names[value.val] }})</p>
</template>