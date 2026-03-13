<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Footer from "@/components/footer/Footer.vue";
import {useRoute, useRouter} from "vue-router";
import {Toaster} from "vue-sonner";
import 'vue-sonner/style.css'
import {useUserData} from "@/stores/userData.ts";
import {useJWTData} from "@/stores/jwtData.ts";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import {Button} from "@/components/ui/button";
import CircleButton from "@/components/customUI/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import WithTooltip from "@/components/customUI/WithTooltip.vue";

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

    <div class="flex flex-col relative flex-1 w-full">
      <RouterView/>
      <LoadingOverlay/>
    </div>

    <Toaster/>

    <Footer/>
  </div>

  <div v-if="userData.loggedIn" class="absolute bottom-5 right-5">
    <WithTooltip text="Новая заметка">
      <CircleButton variant="default" class="size-15" as-child>
        <RouterLink to="/note">
          <SafeIcon icon="lucide:plus" class="size-7"/>
        </RouterLink>
      </CircleButton>
    </WithTooltip>
  </div>
</template>