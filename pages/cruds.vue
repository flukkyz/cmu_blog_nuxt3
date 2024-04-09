<script setup lang="ts">
import { FormsCrud } from "#components";
import type { Crud } from "~/components/forms/Crud.vue";

const localePath = useLocalePath();
const { t } = useI18n();
const toast = useToast();

breadcrumbs().setItems([
  {
    label: t("HOME"),
    to: localePath({ name: "index" }),
    icon: "i-fa6-solid-house",
  },
  {
    label: "CRUDs",
    icon: "i-fa6-solid-cube",
  },
]);

const queryString = ref({
  size: 10,
  page: 1,
  q: "",
});

const columns = [
  {
    key: "name",
    label: "Title",
  },
  {
    key: "actions",
  },
];

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

const destroyItem = async (id: number) => {
  await destroy(id);
  refresh();
  loading().show();
};

const crudForm = ref<InstanceType<typeof FormsCrud> | null>(null);
const createItem = () => {
  crudForm.value?.show();
};
const updateItem = (data: Crud) => {
  crudForm.value?.show(data);
};

const onSave = async (data: Crud, mode: Mode) => {
  if (mode === "add") {
    const { error } = await create(data);
    if (error.value) {
      toast.add({
        title: error.value.statusCode?.toString(),
        description: error.value.statusMessage,
      });
    }
  } else {
    const { error } = await update(data.id!, data);
    if (error.value) {
      toast.add({
        title: error.value.statusCode?.toString(),
        description: error.value.statusMessage,
      });
    }
  }
  refresh();
};
</script>

<template>
  <div>
    <div
      class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
    >
      <UInput v-model="queryString.q" placeholder="Filter title..." />
      <UButton label="Create" @click="createItem" />
    </div>

    <UTable :rows="data?.rows" :columns="columns" :loading="pending">
      <template #actions-data="{ row }">
        <UButton label="update" @click="updateItem(row)" />
        <UButton label="delete" @click="destroyItem(row.id)" />
      </template>
    </UTable>

    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="queryString.page"
        :page-count="queryString.size"
        :total="data?.totalItems"
      />
    </div>
  </div>

  <FormsCrud ref="crudForm" @save="onSave!" />
</template>
