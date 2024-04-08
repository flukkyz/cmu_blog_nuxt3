<template>
  <USlideover v-model="drawer" side="left" :ui="{ width: 'max-w-xs' }">
    <UVerticalNavigation :links="menus().frontend" @change="onChangeRoute" />
  </USlideover>
</template>

<script setup lang="ts">
const side = sidebar();
const drawer = computed({
  get() {
    return side.drawer;
  },
  set(val) {
    side.drawer = val;
  },
});

const onChangeRoute = () => {
  console.log("sss");
};
</script>
