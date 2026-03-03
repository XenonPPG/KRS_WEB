<script setup lang="ts">
import HeaderLink from "@/components/header/HeaderLink.vue";
import {Separator} from "@/components/ui/separator";
import ThemeSelector from "@/components/header/ThemeSelector.vue";
import HeaderAccountButton from "@/components/header/HeaderAccountButton.vue";
import {onMounted, ref} from "vue";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";

const received = ref(false)
const status = ref(false)

onMounted(() => {
  setInterval(async () => {
    try {
      const res = await serviceAPI.healthList()
      received.value = true
      status.value = res.status === 200
    } catch {
      received.value = true
      status.value = false
    }
  }, 1000)
})
</script>

<template>
  <div class="w-full flex items-center justify-between h-15 p-5 gap-2">
    <div class="flex-center gap-2 h-5">
      <HeaderLink link="/" class="font-medium"/>
      <Separator orientation="vertical"/>

      <!-- other routes -->
      <HeaderLink link="/note"/>
      <HeaderLink link="/vault"/>
    </div>

    <div class="flex-center gap-2 h-5">
      <!-- service status -->
      <div v-if="received" class="flex-center gap-[0.5ch] mr-5" v-motion-fade>
        <div class="rounded-full size-2 bg-red-500" :class="{'bg-green-500!':status}"/>
        <p class="font-secondary">Сервис {{ status ? 'онлайн' : 'оффлайн' }}</p>
      </div>

      <!-- color theme selector -->
      <ThemeSelector/>

      <!-- user button -->
      <Separator orientation="vertical"/>
      <HeaderAccountButton/>
    </div>
  </div>
</template>