<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {Button} from "@/components/ui/button";
import {useUserData} from "@/stores/userData.ts";

const props = defineProps<{
  link: string
}>()

const userData = useUserData()
const router = useRouter()
const route = useRoute()
const targetRoute = computed(() => router.options.routes.find(r => r.path === props.link))
const title = computed(() => targetRoute.value?.name)

const isSelected = computed(() => route.path == props.link)
</script>

<template>
  <Button v-if="!targetRoute?.meta?.requiresAuth || userData.loggedIn" variant="ghost" class="p-3 text-2xl font-normal font-secondary" :class="{'underline':isSelected}" as-child>
    <RouterLink :to="props.link">
      {{ title }}
    </RouterLink>
  </Button>
</template>