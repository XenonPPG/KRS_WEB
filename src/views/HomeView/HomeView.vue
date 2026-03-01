<script setup lang="ts">

import NoteMock from "@/views/HomeView/NoteMock.vue";
</script>

<template>
  <div class="flex items-center justify-between w-full px-20">
    <div v-motion-slide-bottom class="flex flex-col items-start">
      <h1 class="text-[120px]">KRS</h1>
      <h2>Ваш сервис с JWT аутентификацией</h2>
    </div>

    <div class="relative mr-80 mb-130 w-40">
      <NoteMock :show-text="false" class="absolute top-10 left-10"/>
      <NoteMock :show-text="false" class="absolute top-5 left-5"/>
      <NoteMock :show-text="true" class="absolute top-0 left-0"/>
    </div>
  </div>
</template>