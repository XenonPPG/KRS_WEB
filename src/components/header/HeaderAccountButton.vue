<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {useUserData} from "@/stores/userData.ts";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()
const userData = useUserData()

function HandleClick() {
  if (userData.loggedIn) {
    // TODO: open menu with account functions
  } else if (route.path != "/login" && route.path != "/register") {
    router.push('/login')
  }
}
</script>

<template>
  <CircleButton @click="HandleClick" :class="{'border-dashed':!userData.loggedIn}">
    <SafeIcon icon="lucide:user"/>
  </CircleButton>
</template>