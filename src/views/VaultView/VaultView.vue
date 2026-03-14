<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import {serviceAPI} from "@/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import Note from "@/views/VaultView/Note.vue";
import type {NoteModel} from "@/views/VaultView/note.model.ts";
import {toast} from "vue-sonner";
import Pagination from "@/components/customUI/Pagination/Pagination.vue";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {DeleteNote, GetAllNotes} from "@/api/controllers/note/note.controller.ts";

const LIMIT = 8

const offset = ref(1)
const notes = ref<NoteModel[]>([])
const totalCount = ref(0)
const ascendingOrder = ref(true)

async function LoadNotes() {
  const result = await GetAllNotes(LIMIT, (offset.value - 1) * LIMIT, ascendingOrder.value)

  if (!IsSuccessful(result.status) || !result.data.notes) {
    return
  }

  notes.value = []
  result.data.notes.notes.forEach((n: any) => {
    notes.value.push({
      id: n.id,
      title: n.title,
      content: n.content,
      createdAt: n.createdAt,
    })
  })

  totalCount.value = result.data.notes.total_count

  console.log(result.data.notes.total_count)
}

async function HandleDeleteNote(id: number) {
  const result = await DeleteNote(id)

  if (!IsSuccessful(result.status)) {
    return
  }

  await LoadNotes()
}

const paginationRequired = computed(() => totalCount.value > LIMIT)

onMounted(LoadNotes)
watch([offset, ascendingOrder], LoadNotes)
</script>

<template>
  <div class="flex flex-col items-start min-h-full w-full">
    <div class="flex-center w-full">
      <div class="relative">
        <Pagination class="w-min" v-if="paginationRequired" v-model="offset" :itemsPerPage="LIMIT"
                    :totalCount="totalCount"/>

        <Button @click="ascendingOrder = !ascendingOrder" size="icon" variant="outline" class="absolute top-1/2 -translate-y-1/2 left-[calc(100%+8px)]">
          <SafeIcon icon="lucide:chevron-up" class="transition-transform" :class="{'rotate-180':!ascendingOrder}"/>
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-4 w-full gap-2 p-3 flex-1">
      <Note @delete="HandleDeleteNote" v-for="note in notes" :note="note"/>
    </div>

    <Pagination v-if="paginationRequired" v-model="offset" :itemsPerPage="LIMIT" :totalCount="totalCount"/>
  </div>
</template>