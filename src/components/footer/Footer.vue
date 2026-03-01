<script setup lang="ts">
import GithubLink from "@/components/footer/GithubLink.vue";
import List from "@/components/customUI/List.vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import HighlightedText from "@/components/footer/HighlightedText.vue";
</script>

<template>
  <div class="w-full flex-center justify-between p-5">
    <List class="size-min text-muted-foreground/50 hover:text-primary transition-colors">
      <template #title>
        <SafeIcon icon="radix-icons:github-logo"/>
        <span class="font-secondary">Github</span>
      </template>

      <template #content>
        <div class="flex flex-col items-start font-secondary">
          <GithubLink link="https://github.com/XenonPPG/KRS_WEB" title="Фронтенд"/>
          <GithubLink link="https://github.com/XenonPPG/KRS_JWT" title="Бэкенд"/>
          <GithubLink link="https://github.com/XenonPPG/KRS_DB" title="База данных"/>
          <GithubLink link="https://github.com/XenonPPG/KRS_CONTRACTS" title="API контракты"/>
        </div>
      </template>
    </List>

    <div class="flex-center gap-[0.5ch] text-muted-foreground/50">
      <HighlightedText/>
      <SafeIcon icon="tabler:heart-filled"/>
    </div>

    <div class="w-40"/>
  </div>
</template>