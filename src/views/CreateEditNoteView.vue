<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {computed, onMounted, ref, watch} from "vue";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import router from "@/router.ts";
import {useRoute} from "vue-router";

const route = useRoute()
const id = computed(() => route.params.id)

const title = ref("")
const content = ref("")

async function UpdateView() {
  if (!id.value) return;

  let error: boolean
  let result: any

  try {
    result = await serviceAPI.noteDetail(parseInt(typeof id.value === 'string' ? id.value : (id.value[0] as string)))

    error = !IsSuccessful(result.status)
  } catch {
    error = true
  }

  if (error) {
    toast.error("Ошибка")
    await router.push('/vault')
    return
  }

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

async function CreateNote() {
  let error: boolean

  try {
    const res: any = await serviceAPI.noteCreate({
      title: title.value,
      content: content.value,
    })

    error = !IsSuccessful(res.status)
  } catch {
    error = true
  }

  if (error) {
    toast.error("Произошла ошибка")
    return
  }

  toast.info("Создано!")
}

async function EditNote() {
  if (!id.value) return

  let error: boolean

  try {
    const res: any = await serviceAPI.noteUpdate({
      title: title.value,
      content: content.value,
      id: parseInt(typeof id.value === 'string' ? id.value : (id.value[0] as string))
    })

    error = !IsSuccessful(res.status)
  } catch {
    error = true
  }

  if (error) {
    toast.error("Произошла ошибка")
    return
  }

  toast.info("Успешно!")
}

function ClearFields(){
  title.value = ''
  content.value = ''
}

function HandleClick() {
  if (id.value) {
    EditNote()
    router.push('/note')
  } else {
    CreateNote()
  }
  ClearFields()
}

watch(id, () => {
  if(!id.value){
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
          <Textarea v-model="content" class="w-100 max-h-100 h-100 text-lg!" placeholder="Содержание"/>
        </CardContent>
      </Card>

      <div class="flex gap-1">
        <Button variant="outline" @click="AddTime">
          <SafeIcon icon="lucide:calendar-clock"/>
          Добавить время
        </Button>

        <Button variant="outline" @click="HandleClick">
          <SafeIcon :icon="id ? 'lucide:pencil' : 'lucide:send'"/>
          {{ id ? 'Редактировать' : 'Создать' }}
        </Button>
      </div>
    </div>
  </div>
</template>