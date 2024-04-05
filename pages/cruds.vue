<script setup lang="ts">
const localePath = useLocalePath();

const queryString = ref({
  size: 10,
  page: 1,
  q: "",
});

const currentData = ref();

const { data, pending, refresh, create, update, destroy } = await useCruds(
  queryString
);

const checkLastPage = () => {
  if (
    data.value &&
    queryString.value.page > data.value.totalPages &&
    data.value.totalPages > 0
  ) {
    queryString.value.page = data.value.totalPages;
    refresh();
  }
};
watch(data, checkLastPage);

const createItem = async () => {
  const data = await create({ name: "bbb" });
  if (data.status.value === "success") {
    currentData.value = data.data;
    refresh();
  }
};
const updateItem = async () => {
  const { error } = await update(5, { name: "cccc" });
  if (error.value) {
    console.log(error.value.statusCode);

    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    });
  }
  refresh();
};
const destroyItem = async () => {
  await destroy(15);
  refresh();
  loading().show();
};
</script>

<template>
  <div>
    showLoading : {{ loading().showLoading }}
    <UButton label="about page" :to="localePath({ name: 'about' })" />
    <pre>
      {{ queryString }}
    </pre>
    {{ currentData }}
    <h1>User Profile</h1>
    <div v-if="pending">Loading...</div>
    <div v-else>
      <pre>
        {{ data }}
      </pre>
    </div>
    <UButton label="Create" @click="createItem" />
    <UButton label="update" @click="updateItem" />
    <UButton label="delete" @click="destroyItem" />
    <UButton label="search" @click="queryString.q = 'cc'" />
    <UButton label="clear" @click="queryString.q = ''" />
  </div>
</template>
