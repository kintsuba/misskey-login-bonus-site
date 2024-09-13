<template>
  <header class="bg-primary-500 w-full shadow">
    <UContainer class="h-14 flex justify-between align-middle">
      <h1 class="flex">
        <UButton
          :ui="{ base: 'font-title', size: { xl: 'text-3xl' } }"
          color="primary"
          variant="solid"
          size="xl"
          label="ログボ！"
          to="/"
        />
      </h1>
    </UContainer>
  </header>
</template>

<script setup lang="ts"></script>
