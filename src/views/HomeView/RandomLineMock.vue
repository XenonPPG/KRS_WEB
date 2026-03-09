<script setup lang="ts">
import {ref} from "vue";

// TODO: add braille font to assets

const props = defineProps<{
  length: number
}>()

function SelectRandom(str: string): string {
  return str[Math.floor(Math.random() * str.length)] as string
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const characters = ref<string>("")

for (let i = 0; i < props.length; i++) {
  characters.value += SelectRandom(alphabet)
}

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * characters.value.length)
  characters.value = characters.value.substring(0, randomIndex) + SelectRandom(alphabet) + characters.value.substring(randomIndex + 1)
}, 50)
</script>

<template>
  <p style="font-family: Braille,serif">{{ characters }}</p>
</template>