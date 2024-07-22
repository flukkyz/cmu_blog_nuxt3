<script setup lang="ts">
const text = ref<string>("");
</script>

<template>
  <div>
    <h1 class="container mt-3 mb-3">Sample CKEditor with Nuxt.js</h1>
    <div class="container">
      <CustomCkEditor v-model="text" />
    </div>
    <div class="container mt-10">
      <h2 class="font-bold text-2xl">Output</h2>
      <div>{{ text }}</div>
    </div>
    <div class="container mt-10">
      <h2 class="font-bold text-2xl">Preview</h2>
      <RenderCkEditor :html="text" />
    </div>
  </div>
</template>
