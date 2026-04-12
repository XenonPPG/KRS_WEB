<script setup lang="ts">
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {useRoute} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {GetUser, UpdatePassword, UpdateUser} from "@/api/controllers/user/user.controller.ts";
import {EmptyUser, useUserData} from "@/stores/userData.ts";
import {toast} from "vue-sonner";
import type {User} from "@/api/controllers/user/user.model.ts";
import UpdateUserViewCategory from "@/views/UpdateUserView/UpdateUserViewCategory.vue";
import InputWithLabel from "@/components/customUI/InputWithLabel.vue";
import WithLabel from "@/components/customUI/WithLabel.vue";
import {Button} from "@/components/ui/button";
import EasySelect from "@/components/customUI/EasySelect.vue";
import {UserV1ColorTheme, UserV1UserRole} from "@/api/gen/Api.ts";
import UserRoleSelect from "@/components/customUI/UserRoleSelect.vue";
import {IsSuccessful, PushUnauthorized} from "@/scripts/utils.ts";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import UpdatePasswordDialog from "@/views/UpdateUserView/UpdatePasswordDialog.vue";

const route = useRoute()
const userData = useUserData()
const user = ref<User>(EmptyUser)
const updatedUser = ref<User>(EmptyUser)
const id = computed(() => parseInt(route.params.id as string))

const dialogOpen = ref(false)

async function GetUserData() {
  const result = await GetUser(id.value)
  console.log('raw role:', result.data.user.role, typeof result.data.user.role)
  const u = userData.ParseUserData(result.data.user)

  if (!u) {
    toast.error("Что-то пошло не так")
    return
  }

  if (u.id != userData.user.id && userData.user.role != UserV1UserRole.UserRoleADMIN) {
    await PushUnauthorized()
  }

  user.value = u
  updatedUser.value = JSON.parse(JSON.stringify(u))
}

async function UpdateUserRequest() {
  const result = await UpdateUser(
      updatedUser.value.id,
      updatedUser.value.login,
      updatedUser.value.role,
      updatedUser.value.colorTheme,
      true)

  if (!IsSuccessful(result.status)) return

  user.value = JSON.parse(JSON.stringify(updatedUser.value))

  if (user.value.id == userData.user.id) {
    userData.user = user.value
  }
}

async function HandleUpdatePassword(oldPsw: string | undefined, newPsw: string) {
  const result = await UpdatePassword(
      userData.user.id,
      updatedUser.value.id,
      oldPsw,
      newPsw
  )
  dialogOpen.value = !(result.status && IsSuccessful(result.status))
}

const canRedact = computed(() => user.value.id === userData.user.id
    || (user.value.role !== UserV1UserRole.UserRoleADMIN
        && userData.user.role as UserV1UserRole == UserV1UserRole.UserRoleADMIN))

onMounted(GetUserData)
watch(() => route.params.id, GetUserData)
</script>

<template>
  <div class="flex-center items-start flex-1 gap-10">
    <!-- pfp and login -->
    <div class="flex-center flex-col gap-5 self-stretch">
      <div class="flex-center size-100 rounded-full border-2 bg-muted-foreground/5">
        <SafeIcon icon="lucide:user" class="size-50"/>
      </div>

      <h1>{{ updatedUser?.login }}</h1>
    </div>

    <!-- settings -->
    <div class="flex flex-col gap-10">
      <UpdateUserViewCategory category="Учетная запись">
        <InputWithLabel :disabled="!canRedact" label="Логин" v-model="updatedUser.login"/>

        <WithLabel label="Пароль" position="top">
          <Dialog :open="dialogOpen" @update:open="dialogOpen = $event">
            <DialogTrigger as-child @click="dialogOpen = true">
              <Button :disabled="!canRedact" variant="outline"
                      class="flex justify-start disabled:hover:cursor-not-allowed">
                Сменить пароль
              </Button>
            </DialogTrigger>

            <UpdatePasswordDialog v-model="dialogOpen" :editingUserId="updatedUser.id" @success="HandleUpdatePassword"/>
          </Dialog>
        </WithLabel>
      </UpdateUserViewCategory>

      <UpdateUserViewCategory category="Права">
        <WithLabel class="flex w-full"
                   :label="updatedUser.role < user.role ? '* Выбранная роль имеет меньше прав' : ''"
                   position="bottom"
                   labelClass="text-destructive h-0 w-max">
          <WithLabel label="Роль" position="top">
            <UserRoleSelect v-model="updatedUser.role" :editingUser="user"/>
          </WithLabel>
        </WithLabel>
      </UpdateUserViewCategory>

      <UpdateUserViewCategory category="Другое">
        <WithLabel label="Цветовая тема" position="top">
          <EasySelect
              :disabled="!canRedact"
              v-model="updatedUser.colorTheme"
              :items="{
            'Система':UserV1ColorTheme.ColorThemeAUTO,
            'Светлая':UserV1ColorTheme.ColorThemeLIGHT,
            'Тёмная':UserV1ColorTheme.ColorThemeDARK,
          }"/>
        </WithLabel>
      </UpdateUserViewCategory>

      <Button @click="UpdateUserRequest" :disabled="JSON.stringify(user) === JSON.stringify(updatedUser)"
              class="w-min px-10">Сохранить
      </Button>
    </div>
  </div>
</template>