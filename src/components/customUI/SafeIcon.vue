<script setup lang="ts">
import {Icon, loadIcon} from "@iconify/vue"
import {Skeleton} from "@/components/ui/skeleton";
import {defineAsyncComponent, onMounted, ref} from "vue";

const props = defineProps<{
  icon: string
}>()

const loaded = ref(false);
onMounted(async () => {
  await loadIcon(props.icon)
  loaded.value = true
})

defineOptions({inheritAttrs: false})
</script>

<template>
  <span class="inline-flex">
    <Icon v-if="loaded" v-bind="$attrs" :icon="icon"/>
    <Skeleton v-else class="rounded-full w-[1em] h-[1em]"/>
  </span>
</template>