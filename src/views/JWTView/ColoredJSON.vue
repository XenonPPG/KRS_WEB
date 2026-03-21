<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  text: string
}>()

const lines = computed(() =>
    props.text
        .replace('{', '')
        .replace('}', '')
        .split(','))

function SplitPair(pair: string): string[] {
  return pair.split(':')
}
</script>

<template>
  <p>{<br/>
    <span v-for="(l, _) in lines" class="ml-4">
      <span class="text-purple-400">{{ SplitPair(l)[0] }}:</span> {{ SplitPair(l)[1]}},
      <br/>
    </span>
    }
  </p>
</template>