<script setup lang="ts">
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button"; // Добавили импорт
import {Input} from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {z} from 'zod';
import {useForm} from "vee-validate";
import {toTypedSchema} from '@vee-validate/zod';
import {Separator} from "@/components/ui/separator";

const formSchema = z.object({
  login: z.string().min(2, "Минимум 2 символа").max(50, "Слишком длинное имя"),
  password: z.string().min(6, "Минимум 6 символов").max(40, "Слишком длинный пароль"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"]
});

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    login: '',
    password: '',
    confirmPassword: '',
  },
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Данные формы:", values);
});

const props = defineProps<{
  login: boolean
}>()

function GetAuthLabel(login: boolean){
  return login ? 'Войти' : 'Регистрация'
}
</script>

<template>
  <Card class="w-120 mx-auto h-full flex flex-col">
    <CardHeader>
      <div class="flex-center justify-between">
        <h1 class="text-2xl font-bold font-secondary">{{ GetAuthLabel(props.login) }}</h1>
        <Button variant="default" class="w-30 flex justify-start" as-child>
          <RouterLink :to="props.login ? '/register' : '/login'">
            &gt; {{ GetAuthLabel(!props.login) }}
          </RouterLink>
        </Button>
      </div>
    </CardHeader>

    <CardContent class="flex grow flex-col">
      <form @submit="onSubmit" class="space-y-4 flex flex-col justify-between h-full">
        <div class="flex flex-col gap-4">
          <!-- login -->
          <FormField v-slot="{ componentField }" name="login">
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>

          <!-- password -->
          <Separator/>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem class="mt-2">
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>

          <!-- repeat password -->
          <FormField v-if="!login" v-slot="{ componentField }" name="confirmPassword">
            <FormItem v-motion-slide-bottom>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input type="password" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
        </div>

        <Button type="submit" class="w-full mb-30">Отправить</Button>
      </form>
    </CardContent>
  </Card>
</template>