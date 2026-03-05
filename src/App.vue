<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import {useRoute, useRouter} from "vue-router";
import {toast, Toaster} from "vue-sonner";
import 'vue-sonner/style.css'
import {GetJWTData} from "@/scripts/api/JWT.ts";
import {onMounted} from "vue";
import {useUserData} from "@/stores/userData.ts";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";

// update title
const router = useRouter();
const route = useRoute();
router.afterEach(() => {
  if (route.path == '/') {
    document.title = 'KRS'
  } else if (route.name) {
    document.title = 'KRS | ' + route.name.toString()
  }
})

const userData = useUserData()

// update user data
onMounted(async () => {
  // get jwt data
  const result = GetJWTData()
  if (!result) return

  // check payload
  const [_, payload] = result
  if (!payload){
    toast.error("Не удалось загрузить данные")
    return
  }

  // get user
  const res = await serviceAPI.userDetail((payload as any).user_id)
  const user = res.data.user
  if (!user){
    toast.error("Не удалось загрузить данные")
    return
  }

  userData.loggedIn = true
  userData.id = user.id
  userData.name = user.name
  userData.colorTheme = user.colorTheme
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Header/>

    <div class="flex-center flex-col">
      <RouterView/>
    </div>

    <Toaster/>

    <Footer/>
  </div>
</template>