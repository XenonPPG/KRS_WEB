<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import {useRoute, useRouter} from "vue-router";

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
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Header/>

    <div class="flex-center flex-col">
      <RouterView/>
    </div>

    <Footer/>
  </div>
</template>