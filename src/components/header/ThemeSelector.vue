<script setup lang="ts">
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {ColorTheme, ColorThemeNames} from "@/scripts/colorTheme.ts";
import {onMounted, ref, watch} from "vue";
import {useUserData} from "@/stores/userData.ts";
import {useColorMode} from "@vueuse/core";

// FIXME: moon doesnt appear when logged in
const colorThemeIcons = {
  [ColorTheme.Auto]: 'radix-icons:half-2',
  [ColorTheme.Light]: 'radix-icons:sun',
  [ColorTheme.Dark]: 'radix-icons:moon',
}

const open = ref(false)

const userData = useUserData()

const mode = useColorMode({disableTransition: false})
onMounted(() => {
  mode.value = ColorThemeNames[userData.colorTheme] as "light" | "dark" | "auto"
})

watch(() => userData.colorTheme, () => {
  mode.value = ColorThemeNames[userData.colorTheme] as "light" | "dark" | "auto"
})
</script>

<template>
  <div class="relative z-999" v-click-outside="() => open = false">
    <CircleButton @click="open = !open">
      <SafeIcon :icon="colorThemeIcons[userData.colorTheme]"/>
    </CircleButton>

    <div class="flex flex-col absolute gap-1 mt-3" v-motion-slide-top v-if="open">
      <CircleButton
          v-for="(val, key) in colorThemeIcons"
          @click="userData.colorTheme = key"
          :variant="userData.colorTheme == key ? 'default' : 'outline'">

        <SafeIcon :icon="val"/>
      </CircleButton>
    </div>
  </div>
</template>