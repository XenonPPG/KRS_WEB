<script setup lang="ts">
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {computed, onMounted} from "vue";
import {Clamp} from "@/scripts/utils.ts";
import PaginationButton from "@/components/customUI/Pagination/PaginationButton.vue";

const props = defineProps<{
  itemsPerPage: number,
  totalCount: number,
}>()

const index = defineModel<number>({default: 0})
const lastIndex = computed(() => Math.ceil(props.totalCount / props.itemsPerPage))

const moreAtLeft = computed(() => CalculateIndex(1) - 1 > 1)
const moreAtRight = computed(() => lastIndex.value - CalculateIndex(3) > 1)

function SetIndex(i: number) {
  index.value = i
}

function CalculateIndex(i: number) {
  return Clamp(index.value, 3, lastIndex.value - 2) + i - 2
}
</script>

<template>
  <div class="flex-center gap-5 w-full">
    <!-- backward button -->
    <Button @click="index--" :disabled="index == 1" class="font-secondary" variant="ghost">
      <SafeIcon icon="lucide:chevron-left"/>
      Назад
    </Button>

    <!-- page buttons -->
    <div class="flex-center gap-1">
      <!-- first index -->
      <PaginationButton :index="1" :selectedIndex="index" @select="SetIndex"/>
      <SafeIcon v-if="moreAtLeft" icon="lucide:ellipsis"/>

      <!-- middle buttons -->
      <template v-for="i in 3">
        <PaginationButton
            v-if="lastIndex > 2 && CalculateIndex(i) > 1 && CalculateIndex(i) < lastIndex"
            size="icon"
            variant="outline"
            :index="CalculateIndex(i)"
            :selectedIndex="index"
            @select="SetIndex"/>
      </template>

      <!-- last index -->
      <SafeIcon v-if="moreAtRight" icon="lucide:ellipsis"/>
      <PaginationButton :index="lastIndex" :selectedIndex="index" @select="SetIndex"/>
    </div>

    <!-- forward button -->
    <Button @click="index++" :disabled="index == lastIndex" class="font-secondary" variant="ghost">
      Вперед
      <SafeIcon icon="lucide:chevron-right"/>
    </Button>
  </div>
</template>