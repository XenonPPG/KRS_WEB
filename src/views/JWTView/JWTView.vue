<script setup lang="ts">
import {useJWTData} from "@/stores/jwtData.ts";
import JWTViewCard from "@/views/JWTView/JWTViewCard.vue";
import JWTJSONViewCard from "@/views/JWTView/JWTJSONViewCard.vue";

const jwtData = useJWTData()
jwtData.LoadData()
</script>

<template>
  <div class="flex-center flex-1 flex-col">
    <div class="grid grid-cols-2 gap-3 flex-1 px-10">
      <!-- text -->
      <div class="flex items-center">
        <h1>Демонстрация<br>JWT токена</h1>
      </div>

      <!-- header -->
      <JWTJSONViewCard
          title="Заголовок"
          json='{"alg": "HS256","typ": "JWT"}'
          :description="{'alg':'Алгоритм', 'typ':'Тип токена'}"/>

      <!-- access token -->
      <JWTViewCard title="Access Token" :content="jwtData.accessToken"/>

      <!-- payload -->
      <JWTJSONViewCard title="Содержимое" :json="jwtData.payload as object"/>
    </div>
  </div>
</template>