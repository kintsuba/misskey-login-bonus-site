<template>
  <BonusHeader />
  <NuxtPage />
</template>

<script setup lang="ts">
const title = "ログボ！";

useHead({
  title,
  htmlAttrs: {
    lang: "ja",
    prefix: "og: http://ogp.me/ns#",
  },
});
</script>
