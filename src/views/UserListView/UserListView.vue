<script setup lang="ts">
import {GetAllUsers} from "@/api/controllers/user/user.controller.ts";
import {onMounted} from "vue";

const USERS_PER_PAGE = 15

async function LoadUsers(){
  const result = await GetAllUsers(USERS_PER_PAGE, 0, true)
  console.log(result)
}

onMounted(LoadUsers)
</script>

<template>

</template>