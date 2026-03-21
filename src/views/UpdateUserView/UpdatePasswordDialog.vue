<script setup lang="ts">
import {computed} from 'vue';
import {DialogContent, DialogHeader} from "@/components/ui/dialog";
import {z} from 'zod';
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useUserData} from "@/stores/userData.ts";

const props = defineProps<{
  editingUserId: number
}>()

const userData = useUserData()

// TODO: change minLength to 6
const formSchema = computed(() => {
  const isEditingSelf = userData.user.id === props.editingUserId;
  const bypassOldPassword = userData.isAdmin && !isEditingSelf;

  const schema = z.object({
    oldPassword: bypassOldPassword
        ? z.string().max(40, 'Слишком длинный пароль').optional()
        : z.string().min(5, 'Минимум 6 символов').max(40, 'Слишком длинный пароль'),
    newPassword: z.string().min(5, 'Минимум 6 символов').max(40, 'Слишком длинный пароль'),
  });

  if (!bypassOldPassword) {
    return schema.refine(data => data.oldPassword !== data.newPassword, {
      message: 'Новый пароль должен отличаться от старого',
      path: ['newPassword'],
    });
  }

  return schema;
});

const form = useForm({
  validationSchema: toTypedSchema(formSchema.value),
  initialValues: {
    oldPassword: '',
    newPassword: '',
  },
});

const emit = defineEmits<{
  (event: 'success', oldPassword: string | undefined, newPassword: string): void
}>()

async function onSubmit(event: Event) {
  event.preventDefault()
  const result = await form.validate()
  if (result.valid) {
    emit('success', form.values.oldPassword || undefined, form.values.newPassword!)
  }
}
</script>

<template>
  <DialogContent>
    <DialogHeader class="text-2xl font-secondary">Сменить пароль</DialogHeader>

    <form @submit.prevent="onSubmit" class="space-y-4 flex flex-col justify-between h-full">
      <div class="flex flex-col gap-4">

        <!-- old password -->
        <FormField v-if="!userData.isAdmin || userData.user.id === props.editingUserId" v-slot="{ componentField }" name="oldPassword">
          <FormItem>
            <FormLabel>Старый пароль</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>

        <Separator v-if="!userData.isAdmin || userData.user.id === props.editingUserId"/>

        <!-- new password -->
        <FormField v-slot="{ componentField }" name="newPassword">
          <FormItem class="mt-2">
            <FormLabel>Новый пароль</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>

      </div>

      <Button type="submit" class="w-full mb-30">Сохранить</Button>
    </form>
  </DialogContent>
</template>