<script setup lang="ts">
import EasySelect from "@/components/customUI/EasySelect.vue";
import {UserV1UserRole} from "@/api/gen/Api.ts";
import {RoleNames} from "@/api/controllers/user/user.model.ts";
import {useUserData} from "@/stores/userData.ts";

const userData = useUserData()

const model = defineModel<UserV1UserRole>()

const displayOptions = Object.entries(UserV1UserRole)
    .filter(([, value]) => typeof value === 'number' && value !== 0)
    .reduce((acc, [, value]) => {
      acc[RoleNames[value as UserV1UserRole]] = value as UserV1UserRole
      return acc
    }, {} as Record<string, UserV1UserRole>)
</script>

<template>
  <EasySelect :disabled="!userData.isAdmin" v-model="model" :items="displayOptions"/>
</template>