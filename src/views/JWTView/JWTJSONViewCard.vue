<script setup lang="ts">
import JWTViewCard, {type ButtonFunction} from "@/views/JWTView/JWTViewCard.vue";
import {computed, ref} from "vue";
import ColoredJSON from "@/views/JWTView/ColoredJSON.vue";

const props = defineProps<{
  title: string,
  json: object | string,
  description?: Record<string, string>
}>()

const tableView = ref(true)

const jsonText = computed(() => {
  if (!props.json) return "{}"
  if (typeof props.json === 'string') return props.json

  return JSON.stringify(props.json)
})

const buttonFunctions = [
  {
    name: 'JSON вид',
    icon: 'lucide:code-xml',
    func: () => tableView.value = false
  },
  {
    name: 'Табличный вид',
    icon: 'lucide:table-2',
    func: () => tableView.value = true
  },
]
</script>

<template>
  <JWTViewCard
      :title="props.title"
      :content="props.json as string"
      :show-text="false"
      :buttons="[(tableView ? buttonFunctions[0] : buttonFunctions[1]) as ButtonFunction]">

    <div class="grid grid-cols-1 grid-rows-1 overflow-y-auto">
      <div class="col-start-1 row-start-1 h-fit" :class="{'invisible pointer-events-none': tableView}">
        <ColoredJSON :text="jsonText"/>
      </div>

      <div class="col-start-1 row-start-1 h-fit" :class="{'invisible pointer-events-none': !tableView}">
        <table class="w-full border-collapse">
          <tr v-for="(value, key) in JSON.parse(jsonText)" :key="key" class="border-2">
            <th class="border-2 text-indigo-300 p-1">{{ key }}</th>
            <th class="border-2 p-1">{{ value }}</th>
            <th class="border-2 p-1" v-if="props.description">{{ props.description[key] }}</th>
          </tr>
        </table>
      </div>
    </div>
  </JWTViewCard>
</template>