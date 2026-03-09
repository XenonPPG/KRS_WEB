<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import type {NoteModel} from "@/views/VaultView/note.model.ts";
import {computed, ref} from "vue";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = defineProps<{
  note: NoteModel
}>()

const MAX_TITLE_LENGTH = 50
const MAX_CONTENT_LENGTH = 300

function LimitText(text: string, maxLength: number): string {
  if(!text) return '<span class="text-muted-foreground/70">Пусто</span>'

  if (text.length <= maxLength) {
    return text
  }

  return text.substring(0, maxLength) + ' <span class="text-muted-foreground/70">...</span>'
}

const displayDate = computed(() =>
    new Date(props.note.createdAt.seconds * 1000)
        .toLocaleString()
        .replace(',', ''))

const menuOpen = ref(false)
</script>

<template>
  <Card class="h-100 flex-1">
    <CardHeader>
      <div class="flex flex-col">
        <!-- title and menu -->
        <div class="flex justify-between">
          <h2 class="flex-1 wrap-anywhere" v-html="LimitText(props.note.title, MAX_TITLE_LENGTH)"/>

          <!-- menu -->
          <div class="relative">
            <Button @click="menuOpen = !menuOpen" v-click-outside="() => menuOpen = false" size="icon" variant="ghost">
              <SafeIcon icon="lucide:ellipsis-vertical"/>
            </Button>

            <div v-if="menuOpen" v-motion-pop class="flex flex-col items-start absolute right-0 mt-1 border-2 bg-background rounded-md">
              <Button variant="ghost" class="w-full">
                <SafeIcon icon="lucide:pencil"/>
                Редактировать
              </Button>
              <Button variant="ghost" class="text-destructive w-full justify-start hover:text-destructive">
                <SafeIcon icon="lucide:trash"/>
                Удалить
              </Button>
            </div>
          </div>
        </div>

        <!-- created at -->
        <p class="text-muted-foreground/70 text-sm mt-1">{{ displayDate }}</p>
      </div>
    </CardHeader>

    <CardContent class="text-lg wrap-break-word" v-html="LimitText(props.note.content, MAX_CONTENT_LENGTH)"/>
  </Card>
</template>