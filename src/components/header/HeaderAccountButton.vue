<script setup lang="ts">
import CircleButton from "@/components/customUI/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {useUserData} from "@/stores/userData.ts";
import {useRoute, useRouter} from "vue-router";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
import {toast} from "vue-sonner";
import {InitialLogin} from "@/api/initialLogin.ts";
import {Logout} from "@/api/controllers/auth.controller.ts";
import MenuWithFunctions from "@/components/customUI/MenuWithFunctions/MenuWithFunctions.vue";
import {MenuFunction} from "@/components/customUI/MenuWithFunctions/MenuFunction.ts";

const router = useRouter()
const route = useRoute()
const userData = useUserData()
const open = ref(false)

function HandleClick() {
  if (userData.loggedIn) {
    open.value = !open.value
  } else if (route.path != "/login" && route.path != "/register") {
    router.push('/login')
  }
}

async function HandleLogout() {
  await Logout()

  userData.Logout()
  userData.loggedIn = false
  open.value = false

  await InitialLogin()
      .then(_ => window.location.reload())
      .then(_ => toast.info("Вы вышли из аккаунта"))
}
</script>

<template>
  <MenuWithFunctions v-model="open" :functions="[
      new MenuFunction('lucide:arrow-left-right', 'Сменить аккаунт', () => router.push('/login')),
      new MenuFunction('lucide:settings', 'Настройки', () => router.push(`/user/${userData.user.id}/edit`)),
      new MenuFunction('lucide:log-out', 'Выйти', HandleLogout, true),
  ]">
    <CircleButton
        v-click-outside="() => open = false"
        @click="HandleClick"
        :class="{'border-dashed':!userData.loggedIn}">
      <SafeIcon icon="lucide:user"/>
    </CircleButton>
  </MenuWithFunctions>
</template>