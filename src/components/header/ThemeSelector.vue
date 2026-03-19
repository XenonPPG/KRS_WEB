<script setup lang="ts">
import CircleButton from "@/components/customUI/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {ColorThemeNames} from "@/scripts/colorTheme.ts";
import {onMounted, ref, watch} from "vue";
import {useUserData} from "@/stores/userData.ts";
import {useColorMode} from "@vueuse/core";
import {UpdateUser} from "@/api/controllers/user/user.controller.ts";
import {UserV1ColorTheme} from "@/api/gen/Api.ts";

const colorThemeIcons = {
  [UserV1ColorTheme.ColorThemeAUTO]: 'radix-icons:half-2',
  [UserV1ColorTheme.ColorThemeLIGHT]: 'radix-icons:sun',
  [UserV1ColorTheme.ColorThemeDARK]: 'radix-icons:moon',
}

const open = ref(false)

const userData = useUserData()

const mode = useColorMode({disableTransition: false})
onMounted(() => {
  mode.value = ColorThemeNames[userData.user.colorTheme] as "light" | "dark" | "auto"
})

watch(() => userData.user.colorTheme, () => {
  mode.value = ColorThemeNames[userData.user.colorTheme] as "light" | "dark" | "auto"
})
</script>

<template>
  <div class="relative z-999" v-click-outside="() => open = false">
    <!-- this one -->
    <CircleButton @click="open = !open">
      <SafeIcon
          :icon="colorThemeIcons[userData.user.colorTheme === UserV1ColorTheme.ColorThemeTHEMEUNSPECIFIED ? UserV1ColorTheme.ColorThemeAUTO : userData.user.colorTheme]"/>
    </CircleButton>

    <div class="flex flex-col absolute gap-1 mt-3" v-motion-slide-top v-if="open">
      <CircleButton
          v-for="(val, key, i) in colorThemeIcons"
          @click="() => userData.SetColorTheme(Number(key))"
          :variant="userData.user.colorTheme == key ? 'default' : 'outline'"
          :class="{'bg-background!':userData.user.colorTheme != key}">

        <SafeIcon :icon="val"/>
      </CircleButton>
    </div>
  </div>
</template>