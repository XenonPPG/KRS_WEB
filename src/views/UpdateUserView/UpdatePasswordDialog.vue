<script setup lang="ts">
import {DialogContent, DialogHeader} from "@/components/ui/dialog";
import {z} from 'zod';
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

// TODO: change minLength to 6
const formSchema = z.object({
  oldPassword: z.string().min(5, 'Минимум 6 символов').max(40, 'Слишком длинный пароль'),
  newPassword: z.string().min(5, 'Минимум 6 символов').max(40, 'Слишком длинный пароль'),
}).refine(data => data.oldPassword !== data.newPassword, {
  message: 'Новый пароль должен отличаться от старого',
  path: ['newPassword'],
});

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    oldPassword: '',
    newPassword: '',
  },
});

const emit = defineEmits<{
  (event: 'success', oldPassword: string, newPassword: string): void
}>()

async function onSubmit(event: Event) {
  event.preventDefault()
  const result = await form.validate()
  if (result.valid) {
    emit('success', form.values.oldPassword!, form.values.newPassword!)
  }
}
</script>

<template>
  <DialogContent>
    <DialogHeader class="text-2xl font-secondary">Сменить пароль</DialogHeader>

    <form @submit.prevent="onSubmit" class="space-y-4 flex flex-col justify-between h-full">
      <div class="flex flex-col gap-4">

        <!-- old password -->
        <FormField v-slot="{ componentField }" name="oldPassword">
          <FormItem>
            <FormLabel>Старый пароль</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>

        <Separator/>

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