<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {computed, onMounted, ref, watch} from "vue";
import router from "@/router.ts";
import {useRoute} from "vue-router";
import {CreateNote, GetNote, UpdateNote} from "@/api/controllers/note/note.controller.ts";

const route = useRoute()
const id = computed(() => route.params.id)

const title = ref("")
const content = ref("")

async function UpdateView() {
  if (!id.value) return;
  const intId = parseInt(typeof id.value === 'string' ? id.value : (id.value[0] as string))
  const result = await GetNote(intId)

  const note = result.data.note
  title.value = note.title
  content.value = note.content
}

onMounted(UpdateView)

function AddTime() {
  content.value += new Date().toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(',', '')
}

function ClearFields() {
  title.value = ''
  content.value = ''
}

async function HandleClick() {
  if (id.value) {
    if (!id.value) return;
    const intId = parseInt(typeof id.value === 'string' ? id.value : (id.value[0] as string))
    await UpdateNote(intId, content.value, title.value)
  } else {
    await CreateNote(title.value, content.value)
    ClearFields()
  }
}

watch(id, () => {
  if (!id.value) {
    ClearFields()
  }
})
</script>

<template>
  <div class="flex-center flex-col flex-1">
    <div class="flex flex-col gap-1">
      <Card>
        <CardHeader>
          <input v-model="title" placeholder="Заголовок" class="text-3xl outline-none w-100"/>
        </CardHeader>

        <CardContent>
          <Textarea v-model="content" class="w-100 max-h-100 h-100 text-lg!" style="scrollbar-width: none" placeholder="Содержание"/>
        </CardContent>
      </Card>

      <div class="flex gap-1">
        <Button variant="outline" @click="AddTime">
          <SafeIcon icon="lucide:calendar-clock"/>
          Добавить время
        </Button>

        <Button :disabled="!title.length" variant="outline" @click="HandleClick">
          <SafeIcon :icon="id ? 'lucide:pencil' : 'lucide:send'"/>
          {{ id ? 'Редактировать' : 'Создать' }}
        </Button>
      </div>
    </div>
  </div>
</template>