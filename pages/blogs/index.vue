<script setup lang="ts">
import { AlertDialog } from "#components";

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useIToast();
const modelName = " Blog ";

definePageMeta({
  middleware: "auth",
});
useSeoMeta(
  seoTag({
    title: modelName,
    description: "A Simple Blog in Nuxt3",
    keywords: "blog",
  })
);

breadcrumbs().setItems([
  {
    label: t("HOME"),
    to: localePath({ name: "index" }),
    icon: "i-fa6-solid-house",
  },
  {
    label: modelName,
    icon: "i-fa6-solid-blog",
  },
]);

const queryString = ref({
  size: 10,
  page: 1,
  q: "",
});

const { pagination, destroy } = useBlog();

const { data, pending, refresh } = await pagination(queryString);

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

// const alertDelete = ref<InstanceType<typeof AlertDialog> | null>(null);
// const deleteItem = (data: Crud) => {
//   alertDelete.value?.show(data.name, data.id);
// };
// const onDelete = async (id: number) => {
//   const { error } = await destroy(id);
//   if (error.value) {
//     toast.onError(error.value.statusCode!, error.value.statusMessage!);
//   } else {
//     toast.onDelete(t("DELETED"), t("DELETED_", { text: modelName }));
//   }
//   refresh();
// };
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <h2 class="font-bold text-xl text-gray-900 dark:text-white">
      {{ modelName }}
    </h2>
    <div v-if="pending" class="">loading...</div>
    <div
      v-else-if="data"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <UCard
        v-for="item in data?.rows"
        :key="item.id"
        :ui="{
          base: 'overflow-hidden',
          header: { padding: 'p-0 sm:p-0 ' },
          body: { padding: 'p-0 sm:p-0 ' },
          divide: '',
        }"
      >
        <template #header>
          <NuxtImg
            src="https://picsum.photos/1000/500"
            format="webp"
            fit="outside"
          />
        </template>
        <p class="text-lg">{{ item.title }}</p>
        <p class="text-gray-500">
          {{ item.Member.firstname }} {{ item.Member.lastname }}
        </p>
      </UCard>
    </div>
  </div>
</template>
