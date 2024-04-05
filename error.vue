<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div v-if="error">
    <h1>{{ error.statusCode }}</h1>
    <h1>{{ error.statusMessage }}</h1>
    <UButton @click="handleError" label="Go to home" />
  </div>
</template>
