<script setup lang="ts">
import type {User} from "@/api/controllers/user/user.model.ts";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {computed} from "vue";
import CopyText from "@/components/customUI/CopyText.vue";
import {Button} from "@/components/ui/button";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import MenuWithFunctions from "@/components/customUI/MenuWithFunctions/MenuWithFunctions.vue";
import {MenuFunction} from "@/components/customUI/MenuWithFunctions/MenuFunction.ts";
import DefaultMenuWithFunctions from "@/components/customUI/MenuWithFunctions/DefaultMenuWithFunctions.vue";

const props = defineProps<{
  user: User
}>()

const fields = computed(() => {
  return {
    "ID": props.user.id,
    "Роль": props.user.role,
    "Цветовая тема": props.user.colorTheme
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex justify-between">
        <CopyText :text="user.login"/>

        <DefaultMenuWithFunctions :functions="[
            new MenuFunction('lucide:pencil', 'Изменить', () => console.log('edit')),
            new MenuFunction('lucide:trash', 'Удалить', () => console.log('delete'), true),
        ]"/>
      </div>
    </CardHeader>

    <CardContent>
      <div class="flex flex-col text-2xl border-t-2 pt-4">
        <div v-for="(value, key) in fields" class="justify-between flex">
          <p class="text-muted-foreground text-nowrap">{{ key }}:</p>
          <CopyText class="font-secondary" :text="value" align-button="left"/>
        </div>
      </div>
    </CardContent>
  </Card>
</template>