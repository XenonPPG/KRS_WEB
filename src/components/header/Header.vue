<script setup lang="ts">
import HeaderLink from "@/components/header/HeaderLink.vue";
import {Separator} from "@/components/ui/separator";
import ThemeSelector from "@/components/header/ThemeSelector.vue";
import HeaderAccountButton from "@/components/header/HeaderAccountButton.vue";
import {onMounted, ref} from "vue";
import {serviceAPI} from "@/api/InitAPI.ts";
import {Skeleton} from "@/components/ui/skeleton";
import {useUserData} from "@/stores/userData.ts";
import {IsSuccessful} from "@/scripts/utils.ts";

const received = ref(false)
const status = ref(false)

onMounted(async () => {
  try {
    const res = await serviceAPI.healthList()
    received.value = true
    status.value = IsSuccessful(res.status)
  } catch {
    received.value = true
    status.value = false
  }
})

const userData = useUserData()
</script>

<template>
  <div class="w-full flex items-center justify-between h-15 p-5 gap-2">
    <div class="flex-center gap-2 h-5">
      <HeaderLink link="/" class="font-medium"/>
      <Separator orientation="vertical"/>

      <!-- other routes -->
      <HeaderLink link="/note"/>
      <HeaderLink link="/vault"/>
      <HeaderLink v-if="userData.loggedIn" link="/jwt"/>
    </div>

    <div class="flex-center gap-2 h-5">
      <!-- service status -->
      <div v-if="received" class="flex-center gap-[0.5ch] mr-5">
        <div class="rounded-full size-2 bg-red-500" :class="{'bg-green-500!':status}"/>
        <p class="font-secondary">Сервис {{ status ? 'онлайн' : 'оффлайн' }}</p>
      </div>
      <Skeleton v-else class="h-[2ch] w-[20ch]"/>

      <!-- color theme selector -->
      <ThemeSelector/>

      <!-- user button -->
      <Separator orientation="vertical"/>
      <HeaderAccountButton/>
    </div>
  </div>
</template>