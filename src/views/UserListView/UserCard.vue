<script setup lang="ts">
import type {User} from "@/api/controllers/user/user.model.ts";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {computed} from "vue";
import CopyText from "@/components/customUI/CopyText.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {MenuFunction} from "@/components/customUI/MenuWithFunctions/MenuFunction.ts";
import DefaultMenuWithFunctions from "@/components/customUI/MenuWithFunctions/DefaultMenuWithFunctions.vue";
import {UserV1UserRole} from "@/api/gen/Api.ts";
import WithTooltip from "@/components/customUI/WithTooltip.vue";
import router from "@/router.ts";
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import {DeleteUser} from "@/api/controllers/user/user.controller.ts";
import {IsSuccessful} from "@/scripts/utils.ts";

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (event: 'delete'): void
}>()

const fields = computed(() => {
  return {
    "ID": props.user.id,
    "Роль": props.user.role,
    "Цветовая тема": props.user.colorTheme
  }
})

const dialog = useCommonDialog()

async function HandleDeleteUser() {
  const confirm = await dialog.BoolDialogResults(
      'Подтверждение',
      `Вы точно хотите удалить ${props.user.login}?`)

  if (!confirm) return

  const result = await DeleteUser(props.user.id)
  if (IsSuccessful(result.status)) emit('delete')
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex justify-between">
        <div class="flex-center gap-2">
          <WithTooltip v-if="user.role === UserV1UserRole.UserRoleADMIN" text="Админ">
            <SafeIcon
                icon="lucide:crown"
                class="text-xl text-purple-400"/>
          </WithTooltip>
          <CopyText :text="user.login"/>
        </div>

        <DefaultMenuWithFunctions :functions="[
            new MenuFunction('lucide:pencil', 'Изменить', () => router.push(`/user/${user.id}/edit`)),
            new MenuFunction('lucide:trash', 'Удалить', HandleDeleteUser, true),
        ]"
        :disable="user.role == UserV1UserRole.UserRoleADMIN ? [1, 2] : []"/>
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