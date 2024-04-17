<script setup lang="ts">
const date = ref<Date>(new Date());
</script>

<template>
  <DatetimePicker v-model="date" />
  <br />
  <br />
  <br />
  {{ date }}
</template>
