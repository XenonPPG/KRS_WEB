<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed} from "vue";
import {Button} from "@/components/ui/button";

const props = defineProps<{
  link: string
}>()

const router = useRouter()
const title = computed(() => router.options.routes.find(route => {
  return route.path == props.link
})?.name)
</script>

<template>
  <Button variant="ghost" class="p-3 text-2xl font-normal font-secondary" as-child>
    <RouterLink :to="props.link">
      {{ title }}
    </RouterLink>
  </Button>
</template>