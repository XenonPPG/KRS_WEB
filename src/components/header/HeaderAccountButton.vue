<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {useUserData} from "@/stores/userData.ts";
import {useRoute, useRouter} from "vue-router";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import {InitialLogin} from "@/scripts/api/initialLogin.ts";

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

function SwitchAccount() {
  router.push('/login')
  open.value = false
}

async function Logout() {
  const res = await serviceAPI.authLogoutCreate()

  if (!IsSuccessful(res.status)) {
    toast.error("Произошла ошибка")
    return
  }

  userData.Logout()
  userData.loggedIn = false
  open.value = false

  await InitialLogin()
      .then(_ => window.location.reload())
      .then(_ => toast.info("Вы вышли из аккаунта"))
}
</script>

<template>
  <div class="relative">
    <CircleButton
        v-click-outside="() => open = false"
        @click="HandleClick"
        :class="{'border-dashed':!userData.loggedIn}">
      <SafeIcon icon="lucide:user"/>
    </CircleButton>

    <Card
        v-if="open"
        v-motion-slide-top
        class="absolute right-0 mt-1 p-0 gap-0 items-start z-999">
      <Button @click="SwitchAccount" variant="ghost" class="w-full">
        <SafeIcon icon="lucide:arrow-right-left"/>
        <p>Сменить аккаунт</p>
      </Button>

      <Button @click="Logout" variant="ghost" class="text-destructive w-full justify-start hover:text-destructive">
        <SafeIcon icon="lucide:log-out"/>
        <p>Выйти</p>
      </Button>
    </Card>
  </div>
</template>