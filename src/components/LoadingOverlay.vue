<script setup lang="ts">
import Spinner from "@/components/customUI/Spinner.vue";
import {useGlobalLoading} from "@/stores/loading.ts";

const loading = useGlobalLoading()
</script>

<template>
  <div v-if="loading.loading" class="absolute size-full flex-center backdrop-blur-sm">
    <Spinner class="size-20"/>
  </div>
</template>