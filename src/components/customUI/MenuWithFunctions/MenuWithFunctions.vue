<script setup lang="ts">
import type {MenuFunction} from "@/components/customUI/MenuWithFunctions/MenuFunction.ts";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {Card, CardContent} from "@/components/ui/card";
import {ref} from "vue";

const props = defineProps<{
  functions: MenuFunction[],
  disable?: number[]
}>()

const open = defineModel<boolean>({default: false})

function HandleClick(f: MenuFunction) {
  f.action()
  open.value = false
}
</script>

<template>
  <div v-click-outside="() => open = false" class="relative">
    <slot/>

    <Card v-if="open" v-motion-pop class="absolute right-0 p-0! mt-1 bg-background z-999">
      <CardContent class="p-0">
        <div class="flex flex-col items-start justify-center w-full">
          <!-- functions -->
          <Button
              v-for="(f, i) in functions"
              :disabled="disable?.includes(i + 1)"
              @click="HandleClick(f)"
              variant="ghost"
              class="w-full flex justify-start"
              :class="{'text-destructive!':f.destructive}">

            <SafeIcon :icon="f.icon"/>
            {{ f.title }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>