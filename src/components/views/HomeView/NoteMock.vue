<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import RandomLineMock from "@/components/views/HomeView/RandomLineMock.vue";

const props = defineProps<{
  showText: boolean
}>()

function RandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min - 1;
}
</script>

<template>
  <Card class="px-3 py-5 animate-hover">
    <CardHeader class="border-b-2 h-14">
      <h4 v-if="showText">MyNote</h4>
    </CardHeader>
    <CardContent class="h-100 w-100">
      <template v-if="showText">
        <RandomLineMock v-for="_ in RandomInt(3, 5)" :length="Math.floor(Math.random() * 20) + 5"/>
        <span class="p-2"/>

        <RandomLineMock v-for="_ in RandomInt(3, 5)" :length="Math.floor(Math.random() * 20) + 5"/>
        <span class="p-2"/>

        <RandomLineMock v-for="_ in RandomInt(3, 5)" :length="Math.floor(Math.random() * 20) + 5"/>
        <span class="p-2"/>

        <RandomLineMock :length="25"/>
      </template>
    </CardContent>
  </Card>
</template>

<style scoped>
@keyframes hover {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-hover {
  animation: hover 3s ease-in-out infinite;
}
</style>