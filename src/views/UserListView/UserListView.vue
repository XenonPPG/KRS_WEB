<script setup lang="ts">
import {GetAllUsers} from "@/api/controllers/user/user.controller.ts";
import {computed, onMounted, ref, watch} from "vue";
import type {User} from "@/api/controllers/user/user.model.ts";
import {useUserData} from "@/stores/userData.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import UserCard from "@/views/UserListView/UserCard.vue";
import Pagination from "@/components/customUI/Pagination/Pagination.vue";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const USERS_PER_PAGE = 12
const users = ref<User[]>([])
const totalCount = ref(0)
const offset = ref(1)
const ascendingOrder = ref(true)

const userData = useUserData()

async function LoadUsers() {
  users.value = []

  const result = await GetAllUsers(
      USERS_PER_PAGE,
      (offset.value - 1) * USERS_PER_PAGE,
      ascendingOrder.value)
  console.log(result)

  if (!IsSuccessful(result.status)) return

  result.data.users.users.forEach((user: any) => users.value.push(userData.ParseUserData(user)!))
  totalCount.value = result.data.users.total_count
}

const paginationRequired = computed(() => totalCount.value > USERS_PER_PAGE)

onMounted(LoadUsers)
watch([offset, ascendingOrder], LoadUsers)
</script>

<template>
  <div class="flex-center w-full">
    <div class="relative">
      <Pagination class="w-min" v-if="paginationRequired" v-model="offset" :itemsPerPage="USERS_PER_PAGE"
                  :totalCount="totalCount"/>

      <Button @click="ascendingOrder = !ascendingOrder" size="icon" variant="outline"
              class="absolute top-1/2 -translate-y-1/2 left-[calc(100%+8px)]">
        <SafeIcon icon="lucide:chevron-up" class="transition-transform" :class="{'rotate-180':!ascendingOrder}"/>
      </Button>
    </div>
  </div>

  <div class="grid grid-cols-4 gap-2 m-2">
    <UserCard
        v-for="user in users"
        :user="user"
        @delete="LoadUsers"/>
  </div>

  <Pagination v-model="offset" :items-per-page="USERS_PER_PAGE" :total-count="totalCount"/>
</template>