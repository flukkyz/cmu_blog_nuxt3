<script setup lang="ts">
const queryString = ref({
  size: 10,
  page: 1,
  q: "",
});

const { datas, pending, refresh, create, update } = await useCruds(queryString);

const checkLastPage = () => {
  if (
    datas.value &&
    queryString.value.page > datas.value.totalPages &&
    datas.value.totalPages > 0
  ) {
    queryString.value.page = datas.value.totalPages;
    refresh();
  }
};
watch(datas, checkLastPage);

const createItem = async () => {
  await create({ name: "bbb" });
  refresh();
};
const updateItem = async () => {
  await update(5, { name: "cccc" });
  refresh();
};
</script>

<template>
  <div>
    <pre>
      {{ queryString }}
    </pre>
    <h1>User Profile</h1>
    <div v-if="pending">Loading...</div>
    <div v-else>
      <pre>
        {{ datas }}
      </pre>
    </div>
    <UButton label="Create" @click="createItem" />
    <UButton label="update" @click="updateItem" />
    <UButton label="search" @click="queryString.q = 'cc'" />
  </div>
</template>
