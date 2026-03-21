<script setup lang="ts">
import MenuWithFunctions from "@/components/customUI/MenuWithFunctions/MenuWithFunctions.vue";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {ref} from "vue";
import type {MenuFunction} from "@/components/customUI/MenuWithFunctions/MenuFunction.ts";

const open = ref(false)

const props = withDefaults(defineProps<{
      functions: MenuFunction[],
      icon?: string,
      disable?: number[]
    }>(),
    {
      icon: "lucide:ellipsis-vertical"
    })
</script>

<template>
  <MenuWithFunctions :functions="functions" :disable="disable" v-model="open">
    <Button @click="open = !open" variant="ghost" size="icon">
      <SafeIcon :icon="icon"/>
    </Button>
  </MenuWithFunctions>
</template>