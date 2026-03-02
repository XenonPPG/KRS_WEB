<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {Button} from "@/components/ui/button";

const props = defineProps<{
  link: string
}>()

const router = useRouter()
const route = useRoute()
const title = computed(() => router.options.routes.find(route => {
  return route.path == props.link
})?.name)

const isSelected = computed(() => route.path == props.link)
</script>

<template>
  <Button variant="ghost" class="p-3 text-2xl font-normal font-secondary" :class="{'underline':isSelected}" as-child>
    <RouterLink :to="props.link">
      {{ title }}
    </RouterLink>
  </Button>
</template>