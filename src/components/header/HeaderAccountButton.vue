<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {useUserData} from "@/stores/userData.ts";
import {useRouter} from "vue-router";

const router = useRouter()
const userData = useUserData()

function HandleClick(){
  if(userData.loggedIn){
    // TODO: open menu with account functions
  } else {
    router.push('/auth')
  }
}
</script>

<template>
  <CircleButton @click="HandleClick">
    <SafeIcon icon="lucide:user"/>
  </CircleButton>
</template>