<template>
  <div class="w-full">
    <div class="w-full flex flex-wrap items-center gap-2">
      <div v-for="item in items" :key="item.id" class="w-[200px]">
        <img
          :src="item.img"
          class="w-full object-contain cursor-pointer"
          @click="showCarousel(item.id)"
        />
      </div>
    </div>
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'w-full sm:max-w-[1200px]',
        base: 'overflow-hidden',
        rounded: 'rounded-xl',
      }"
    >
      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="items"
        :ui="{ item: 'basis-full' }"
        class="overflow-hidden"
        indicators
        arrows
      >
        <img :src="item.img" class="w-full" />
      </UCarousel>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref<boolean>(false);

const items = [
  { id: 1, img: "https://picsum.photos/1920/1080?random=1" },
  { id: 2, img: "https://picsum.photos/1920/1080?random=2" },
  { id: 3, img: "https://picsum.photos/1920/1080?random=3" },
  { id: 4, img: "https://picsum.photos/1920/1080?random=4" },
  { id: 5, img: "https://picsum.photos/1920/1080?random=5" },
  { id: 6, img: "https://picsum.photos/1920/1080?random=6" },
];

const carouselRef = ref();
const showCarousel = (id: number) => {
  isOpen.value = true;
  nextTick(() => {
    const findIndex = useFindIndex(items, { id });
    if (findIndex !== -1) {
      setTimeout(() => {
        carouselRef.value.select(findIndex + 1);
      }, 1);
    }
  });
};
</script>
