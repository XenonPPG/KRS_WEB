<script setup lang="ts">
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {ref} from "vue";

const open = ref(false);
</script>

<template>
  <div v-click-outside="() => open = false" class="flex flex-col w-fit relative">
    <div
        class="absolute bottom-full left-0 grid transition-[grid-template-rows] duration-300 ease-in-out w-max z-50 backdrop-blur-sm"
        :class="open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden">
        <div class="min-h-0 border-l-2 pl-3 ml-2 mb-2 flex flex-col">
          <div class="w-full text-left">
            <slot name="content"/>
          </div>
        </div>
      </div>
    </div>

    <button
        @click="open = !open"
        class="flex items-center gap-1 hover:cursor-pointer">
      <SafeIcon
          icon="radix-icons:chevron-right"
          :class="{'-rotate-90': open}"
          class="transition-transform duration-300 ease-in-out"/>
      <slot name="title"/>
    </button>
  </div>
</template>