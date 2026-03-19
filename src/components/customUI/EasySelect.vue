<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  items: any[] | Record<any, any>,
  disable?: any[],
  placeholder?: any
}>()

const model = defineModel<any>()
</script>

<template>
  <Select :model-value="model?.toString()" @update:model-value="model = Number($event)">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="props.placeholder?.toString() ?? model?.toString()"/>
    </SelectTrigger>
    <SelectContent>
      <SelectItem
          v-if="items instanceof Array"
          v-for="item in items"
          :value="item.toString()">
        {{ item }}
      </SelectItem>

      <SelectItem
          v-else
          v-for="(value, key) in items"
          :value="value.toString()">
        {{ key }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>