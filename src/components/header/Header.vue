<script setup lang="ts">
import {Button} from "@/components/ui/button";
import HeaderLink from "@/components/header/HeaderLink.vue";
import {Separator} from "@/components/ui/separator";
</script>

<template>
  <div class="w-full flex items-center h-15 p-5 gap-2">
    <HeaderLink link="/" class="font-medium"/>
    <Separator orientation="vertical"/>

    <!-- other routes -->
    <HeaderLink link="/note"/>
    <div/>
  </div>
</template>