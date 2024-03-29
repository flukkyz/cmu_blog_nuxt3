<template>
  <USlideover v-model="drawer" side="left">
    <UVerticalNavigation :links="items" />
  </USlideover>
</template>

<script setup lang="ts">
const sidebar = useSidebarStore();
const drawer = computed({
  get() {
    return sidebar.drawer;
  },
  set(val) {
    sidebar.drawer = val;
  },
});

const items = [
  {
    label: "Foo",
    to: "foo",
  },
  {
    label: "Bar",
    to: "bar",
  },
  {
    label: "Fizz",
    to: "fizz",
  },
  {
    label: "Buzz",
    to: "buzz",
  },
];
</script>
