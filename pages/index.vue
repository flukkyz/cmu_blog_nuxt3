<script setup lang="ts">
const datas = ref([]);
const fetchData = async () => {
  const { data, error } = await useFetch("http://localhost:5000/api/posts");
  if (error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }
  datas.value = data;
};
fetchData();
</script>

<template>
  <div class="flex flex-col gap-y-5">
    <p class="font-medium">Last Content</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <div
        class="border rounded-lg overflow-hidden"
        v-for="item in datas.rows"
        :key="item.id"
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
