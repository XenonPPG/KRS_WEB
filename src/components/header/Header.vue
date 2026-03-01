<script setup lang="ts">
import HeaderLink from "@/components/header/HeaderLink.vue";
import {Separator} from "@/components/ui/separator";
import ThemeSelector from "@/components/header/ThemeSelector.vue";
</script>

<template>
  <div class="w-full flex items-center h-15 p-5 gap-2">
    <HeaderLink link="/" class="font-medium"/>
    <Separator orientation="vertical"/>

    <!-- other routes -->
    <HeaderLink link="/note"/>

    <ThemeSelector/>
  </div>
</template>