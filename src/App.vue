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
import {useJWTData} from "@/stores/jwtData.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {InitialLogin} from "@/scripts/api/initialLogin.ts";

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
const jwtData = useJWTData()

// update user data
onMounted(InitialLogin)
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