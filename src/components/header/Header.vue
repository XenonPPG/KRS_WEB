<script setup lang="ts">
import HeaderLink from "@/components/header/HeaderLink.vue";
import {Separator} from "@/components/ui/separator";
import ThemeSelector from "@/components/header/ThemeSelector.vue";
import HeaderAccountButton from "@/components/header/HeaderAccountButton.vue";
</script>

<template>
  <div class="w-full flex items-center justify-between h-15 p-5 gap-2">
    <div class="flex-center gap-2 h-5">
      <HeaderLink link="/" class="font-medium"/>
      <Separator orientation="vertical"/>

      <!-- other routes -->
      <HeaderLink link="/note"/>
      <HeaderLink link="/vault"/>
    </div>

    <div class="flex-center gap-2 h-5">
      <!-- service status -->
      <div class="flex-center gap-[0.5ch] mr-5">
        <div class="rounded-full size-2 bg-red-500"/>
        <p class="font-secondary">Сервис оффлайн</p>
      </div>

      <!-- color theme selector -->
      <ThemeSelector/>

      <!-- user button -->
      <Separator orientation="vertical"/>
      <HeaderAccountButton/>
    </div>
  </div>
</template>