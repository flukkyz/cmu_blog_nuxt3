<template>
  <UButton color="primary" variant="outline" @click="toggleDrawer"
    >Button</UButton
  >
</template>

<script setup lang="ts">
const sidebar = useSidebarStore();
const toggleDrawer = () => {
  sidebar.drawer = !sidebar.drawer;
};

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      sidebar.drawer = false;
    },
  },
});
</script>
