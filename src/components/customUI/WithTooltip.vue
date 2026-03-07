<script setup lang="ts">
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const props = withDefaults(defineProps<{
      text: string,
      side?: "top" | "right" | "bottom" | "left",
      delay?: number
    }>(),
    {
      side: "top",
      delay: 300
    })
</script>

<template>
  <TooltipProvider :disableHoverableContent="true" :delayDuration="props.delay">
    <Tooltip>
      <TooltipTrigger as-child>
        <slot/>
      </TooltipTrigger>

      <TooltipContent :side="props.side">
        <p>{{ props.text }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>