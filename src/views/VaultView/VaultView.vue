<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import Note from "@/views/VaultView/Note.vue";
import type {NoteModel} from "@/views/VaultView/note.model.ts";
import {toast} from "vue-sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/ui/pagination";

const LIMIT = 8

const offset = ref(0)
const notes = ref<NoteModel[]>([])
const totalCount = ref(0)

async function GetAllNotes() {
  const result = await serviceAPI.noteList({
    limit: LIMIT,
    offset: offset.value * LIMIT,
  })

  if (!IsSuccessful(result.status) || !result.data.notes) {
    toast.error("Не удалось загрузить заметки")
    return
  }

  notes.value = []
  result.data.notes.notes.forEach((n: any) => {
    notes.value.push({
      title: n.title,
      content: n.content,
      createdAt: n.createdAt,
    })
  })

  totalCount.value = result.data.notes.total_count

  console.log(result.data.notes.total_count)
}

const paginationRequired = computed(() => totalCount.value > LIMIT)

onMounted(GetAllNotes)
watch(offset, GetAllNotes)
</script>

<template>
  <div class="flex flex-col items-start min-h-full w-full">
    <Pagination v-if="paginationRequired" v-slot="{ page }" :items-per-page="LIMIT" :total="totalCount"
                :default-page="1">
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious @click="offset--"/>
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
              @click="offset = item.value - 1"
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>
        <PaginationEllipsis :index="4"/>
        <PaginationNext @click="offset++"/>
      </PaginationContent>
    </Pagination>

    <div class="grid grid-cols-4 w-full gap-2 p-3 flex-1">
      <Note v-for="note in notes" :note="note"/>
    </div>

    <Pagination v-if="paginationRequired" v-slot="{ page }" :items-per-page="LIMIT" :total="totalCount" :default-page="1">
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious @click="offset--"/>
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
              @click="offset = item.value - 1"
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>
        <PaginationEllipsis :index="4"/>
        <PaginationNext @click="offset++"/>
      </PaginationContent>
    </Pagination>
  </div>
</template>