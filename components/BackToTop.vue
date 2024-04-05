<script setup lang="ts">
const showBtn = ref<boolean>(false);

onMounted(() => {
  window.addEventListener("scroll", scrollListener);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollListener);
});

const backToTop = () => {
  window.scrollTo({
    behavior: "smooth",
    top: 0,
  });
};
const scrollListener = () => {
  showBtn.value = window.scrollY > 150;
};
</script>

<template>
  <div
    v-if="showBtn"
    class="fixed bottom-14 right-3 z-10 w-10 h-10 bg-indigo-400 opacity-10 hover:opacity-80 flex items-center justify-center cursor-pointer rounded-full"
    @click="backToTop"
  >
    <UIcon name="i-fa6-solid-arrow-up" class="text-white text-base" />
  </div>
</template>
