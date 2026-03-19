<script setup lang="ts">
import {GetAllUsers} from "@/api/controllers/user/user.controller.ts";
import {onMounted, ref} from "vue";
import type {User} from "@/api/controllers/user/user.model.ts";
import {useUserData} from "@/stores/userData.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import UserCard from "@/views/UserListView/UserCard.vue";

const USERS_PER_PAGE = 15
const users = ref<User[]>([])
const userData = useUserData()

async function LoadUsers(){
  const result = await GetAllUsers(USERS_PER_PAGE, 0, false)
  console.log(result)

  if(!IsSuccessful(result.status)) return

  result.data.users.users.forEach((user: any) => users.value.push(userData.ParseUserData(user)!))
}

onMounted(LoadUsers)
</script>

<template>
  <div class="grid grid-cols-4">
    <UserCard
        v-for="user in users"
        :user="user"/>
  </div>
</template>