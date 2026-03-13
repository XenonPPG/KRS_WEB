<script setup lang="ts">
import CircleButton from "@/components/customUI/CircleButton.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {ColorTheme, ColorThemeMap, ColorThemeNames} from "@/scripts/colorTheme.ts";
import {computed, onMounted, ref, watch} from "vue";
import {useUserData} from "@/stores/userData.ts";
import {useColorMode} from "@vueuse/core";
import {serviceAPI} from "@/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {UpdateUser} from "@/api/user/user.controller.ts";

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

const computedClasses = computed(() => {
  return [ColorTheme.Auto, ColorTheme.Light, ColorTheme.Dark].map(val => {
    return (val == userData.colorTheme ? '' : 'bg-background!') as string
  })
})

async function SetColorTheme(theme: ColorTheme) {
  userData.colorTheme = theme

  await UpdateUser(userData.id, undefined, undefined, theme)
}

console.log('color theme', userData.colorTheme)
</script>

<template>
  <div class="relative z-999" v-click-outside="() => open = false">
    <!-- this one -->
    <CircleButton @click="open = !open">
      <SafeIcon :icon="colorThemeIcons[userData.colorTheme as ColorTheme]"/>
    </CircleButton>

    <div class="flex flex-col absolute gap-1 mt-3" v-motion-slide-top v-if="open">
      <CircleButton
          v-for="(val, key, i) in colorThemeIcons"
          @click="() => SetColorTheme(key)"
          :variant="userData.colorTheme == key ? 'default' : 'outline'"
          :class="computedClasses[i]">

        <SafeIcon :icon="val"/>
      </CircleButton>
    </div>
  </div>
</template>