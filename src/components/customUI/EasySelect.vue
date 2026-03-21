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

function IsDisabled(item: any): boolean {
  return !!props.disable?.includes(item)
}

function getCurrentKey(): string {
  if (props.items instanceof Array) return model.value?.toString() ?? ''
  const entry = Object.entries(props.items).find(([, v]) => Number(v) === Number(model.value))
  return entry?.[0] ?? props.placeholder?.toString() ?? ''
}

function onUpdate(key: string) {
  if (props.items instanceof Array) {
    model.value = Number(key)
  } else {
    model.value = Number((props.items as Record<string, any>)[key])
  }
}
</script>

<template>
  <Select :model-value="getCurrentKey()" @update:model-value="(val) => onUpdate(val!.toString())">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="props.placeholder?.toString()"/>
    </SelectTrigger>
    <SelectContent>
      <SelectItem
          v-if="items instanceof Array"
          v-for="item in items"
          :class="{'text-muted-foreground/50! bg-transparent!': IsDisabled(item)}"
          :value="item.toString()">
        {{ item }}
      </SelectItem>

      <SelectItem
          v-else
          v-for="(value, key) in items"
          :class="{'text-muted-foreground/50! hover:text-muted-foreground/50! hover:bg-transparent! bg-transparent!': IsDisabled(value) || IsDisabled(key)}"
          :value="key.toString()">
        {{ key }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>