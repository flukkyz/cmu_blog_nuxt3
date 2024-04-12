<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const data = ref();
try {
  const res = await $fetch("http://localhost:5000/api/crsuds");
  data.value = res;
} catch (error) {
  data.value = error;
}
</script>
