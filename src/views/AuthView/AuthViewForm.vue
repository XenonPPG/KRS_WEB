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
import {serviceAPI} from "@/scripts/api/InitAPI.ts";
import {useUserData} from "@/stores/userData.ts";
import type {ColorTheme} from "@/scripts/colorTheme.ts";
import {toast} from "vue-sonner";
import type {UserV1ColorTheme} from "@/scripts/api/Api.ts";

const formSchema = z.object({
  login: z.string().min(2, "Минимум 2 символа").max(50, "Слишком длинное имя"),
  password: z.string().min(5, "Минимум 6 символов").max(40, "Слишком длинный пароль"),
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

const userData = useUserData()

async function HandleSubmit(){
  if(props.login){
    await Login()
  } else {
    await Register()
  }
}

async function Login(){
  const result = await serviceAPI.authLoginCreate({
    login: form.values.login,
    password: form.values.password
  })

  console.log(result)

  //TODO: repeat request few times and display error
  if (result.status < 200 || result.status >= 300) return

  userData.loggedIn = true

  const user = result.data.user
  userData.id = user.id
  userData.name = user.name
  userData.colorTheme = user.colorTheme as ColorTheme

  toast.success("Добро пожаловать!")
}

async function Register(){
  const result = await serviceAPI.userCreate({
    login: form.values.login,
    password: form.values.password,
    role: 0,
    colorTheme: (userData.colorTheme ?? 0) as unknown as UserV1ColorTheme
  })

  console.log(result)

  //TODO: repeat request few times and display error
  if (result.status < 200 || result.status >= 300) return

  userData.loggedIn = true

  const user = result.data.user
  userData.id = user.id
  userData.name = user.name
  userData.colorTheme = user.colorTheme as ColorTheme

  toast.success("Добро пожаловать!")
}
</script>

<template>
  <Card class="w-120 mx-auto h-full flex flex-col">
    <CardHeader>
      <div class="flex-center justify-between">
        <h1 class="text-2xl font-bold font-secondary">{{ GetAuthLabel(props.login) }}</h1>
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

        <Button @click="HandleSubmit" type="submit" class="w-full mb-30">Отправить</Button>
      </form>

      <Button variant="secondary" class="w-30 flex justify-start" as-child>
        <RouterLink :to="props.login ? '/register' : '/login'">
          &gt; {{ GetAuthLabel(!props.login) }}
        </RouterLink>
      </Button>
    </CardContent>
  </Card>
</template>