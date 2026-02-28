<script setup lang="ts">
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const props = defineProps<{
  text: string
}>()
</script>

<template>
<TooltipProvider :disableHoverableContent="true">
  <Tooltip>
    <TooltipTrigger as-child>
      <slot/>
    </TooltipTrigger>

    <TooltipContent side="right">
      <p>{{ props.text }}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
</template>