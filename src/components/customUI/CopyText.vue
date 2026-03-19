<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {type HTMLAttributes, ref} from "vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {loadIcons} from "@iconify/vue";
import {CopyText} from "@/scripts/utils.ts";

const props = withDefaults(defineProps<{
      text: any,
      textClass?: HTMLAttributes["class"],
      alignButton?: "left" | "right"
    }>(),
    {
      alignButton: "right",
      textClass: "text-xl",
    })

const isHovering = ref(false)
const cooldown = ref(false)

loadIcons(["lucide:copy", "lucide:check"])

function Copy() {
  if (cooldown.value) return

  cooldown.value = true
  CopyText(props.text.toString())

  setTimeout(() => {
    cooldown.value = false
  }, 1000)
}
</script>

<template>
  <div
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">
    <Button
        @click="Copy"
        variant="ghost">
      <div class="flex-center gap-4" :class="props.textClass">
        <SafeIcon
            v-if="alignButton === 'left'"
            :icon="cooldown ? 'lucide:check' : 'lucide:copy'"
            class="text-muted-foreground opacity-0 transition-opacity"
            :class="{'opacity-100':isHovering}"/>
        {{ text }}
        <SafeIcon
            v-if="alignButton === 'right'"
            :icon="cooldown ? 'lucide:check' : 'lucide:copy'"
            class="text-muted-foreground opacity-0 transition-opacity"
            :class="{'opacity-100':isHovering}"/>
      </div>
    </Button>
  </div>
</template>