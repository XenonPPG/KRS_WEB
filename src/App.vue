<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import {useRoute, useRouter} from "vue-router";
import {Toaster} from "vue-sonner";
import 'vue-sonner/style.css'
import {useUserData} from "@/stores/userData.ts";
import {useJWTData} from "@/stores/jwtData.ts";

// update title
const router = useRouter();
const route = useRoute();

const userData = useUserData()
const jwtData = useJWTData()

router.afterEach(() => {
  // change name
  if (route.path == '/') {
    document.title = 'KRS'
  } else if (route.name) {
    document.title = 'KRS | ' + route.name.toString()
  }
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