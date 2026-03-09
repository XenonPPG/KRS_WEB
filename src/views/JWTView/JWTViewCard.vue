<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {computed} from "vue";
import {CopyText} from "@/scripts/utils.ts";
import WithTooltip from "@/components/customUI/WithTooltip.vue";

export interface ButtonFunction {
  name: string,
  icon: string,
  func: Function
}

const props = withDefaults(defineProps<{
      title: string,
      content: string,
      buttons?: ButtonFunction[],
      showText?: boolean
    }>(),
    {
      showText: true,
    })

const functions = computed(() => [
  ...(props.buttons ?? []),
  {
    name: 'Скопировать',
    icon: 'radix-icons:copy',
    func: () => CopyText(props.content.toString())
  },
])
</script>

<template>
  <Card>
    <!-- title -->
    <CardHeader class="text-2xl font-secondary">
      {{ title }}
    </CardHeader>

    <CardContent class="w-120 wrap-anywhere border-background">
      <!-- upper panel, buttons -->
      <div
          class="p-1 bg-muted-foreground/7 flex items-center rounded-tl-md rounded-tr-md border-b-2 border-background/50">
        <WithTooltip v-for="f in functions" :text="f.name">
          <Button
              @click="f.func"
              size="icon"
              variant="ghost"
              class="text-muted-foreground hover:text-primary">
            <SafeIcon :icon="f.icon"/>
          </Button>
        </WithTooltip>
      </div>

      <!-- content -->
      <div class="p-2 bg-muted-foreground/20 rounded-bl-md rounded-br-md font-secondary">
        <template v-if="props.showText">
          {{ content }}
        </template>
        <slot/>
      </div>
    </CardContent>
  </Card>
</template>