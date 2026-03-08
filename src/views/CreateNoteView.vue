<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {ref} from "vue";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import router from "@/router.ts";

const title = ref("")
const content = ref("")

function AddTime() {
  content.value += new Date().toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(',', '') + "\n"
}

async function CreateNote(){
  let error: boolean

  try{
    const res = await serviceAPI.noteCreate({
      title: title.value,
      content: content.value,
    })

    error = !IsSuccessful(res.status)
  } catch {
    error = true
  }

  if(error){
    toast.error("Произошла ошибка")
    return
  }

  toast.info("Создано!")
  await router.push('/vault')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Card>
      <CardHeader>
        <input v-model="title" placeholder="Заголовок" class="text-3xl outline-none w-100"/>
      </CardHeader>

      <CardContent>
        <Textarea v-model="content" class="w-100 max-h-100 text-lg!" placeholder="Содержание"/>
      </CardContent>
    </Card>

    <div class="flex gap-1">
      <Button variant="outline" @click="AddTime">
        <SafeIcon icon="lucide:calendar-clock"/>
        Добавить время
      </Button>

      <Button variant="outline" @click="CreateNote">
        <SafeIcon icon="lucide:send"/>
        Создать
      </Button>
    </div>
  </div>
</template>