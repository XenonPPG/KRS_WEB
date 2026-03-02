<script setup lang="ts">
import AuthViewForm from "@/views/AuthView/AuthViewForm.vue";
import AuthViewDecoration from "@/views/AuthView/AuthViewDecoration.vue";

const props = defineProps<{
  login: boolean
}>()
</script>

<template>
  <div class="flex gap-10 overflow-hidden">
    <div class="flex-1">
      <AuthViewForm :login="props.login"/>
    </div>
    <div class="flex-1">
      <AuthViewDecoration/>
    </div>
  </div>
</template>