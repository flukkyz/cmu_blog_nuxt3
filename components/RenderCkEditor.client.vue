<template>
  <div class="prose max-w-none" v-html="html" />
</template>

<script setup lang="ts">
defineProps<{
  html: string;
}>();
</script>
