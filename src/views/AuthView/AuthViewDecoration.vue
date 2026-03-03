<script setup lang="ts">
import RandomLineMock from "@/views/HomeView/RandomLineMock.vue";
</script>

<template>
<div class="flex flex-col text-muted-foreground/20 select-none">
  <RandomLineMock v-for="_ in 25" :length="40"/>
</div>
</template>