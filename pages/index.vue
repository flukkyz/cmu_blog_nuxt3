<script setup lang="ts">
// definePageMeta({
//   middleware: "auth",
// });

const dt2 = datetime.toText(new Date());
const dt3 = datetime.age(new Date());
const arr = "asdf";
</script>

<template>
  <div class="flex flex-col gap-y-5">
    <p class="font-medium">Last Content</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <div
        v-for="item in 10"
        :key="item"
        class="border rounded-lg overflow-hidden"
      >
        <NuxtImg
          src="https://picsum.photos/1000"
          format="webp"
          width="300"
          height="169"
        />
        <p class="text-lg">title</p>
        <p class="text-gray-500">title</p>
      </div>
    </div>
  </div>
</template>
