<script setup lang="ts">
import { FormsCrud, AlertDialog } from "#components";
import type { Crud } from "~/components/forms/Crud.vue";

const { t } = useI18n();
const localePath = useLocalePath();
const modelName = " CRUD ";

definePageMeta({
  middleware: "auth",
});
useSeoMeta(
  seoTag({
    title: modelName,
    description: "A Simple CRUD in Nuxt3",
    keywords: "crud",
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

const selected = ref<Crud[]>([]);

const { data, pending, refresh, create, update, destroy, deletes } =
  await useCrud(queryString);

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

const crudForm = ref<InstanceType<typeof FormsCrud> | null>(null);
const createItem = () => {
  crudForm.value?.show();
};
const updateItem = (data: Crud) => {
  crudForm.value?.show(data);
};

const toast = useIToast();
const onSave = async (data: Crud, mode: Mode) => {
  const { error } =
    mode === "add" ? await create(data) : await update(data.id!, data);
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onSuccess(
      mode === "add" ? t("ADDED") : t("UPDATED"),
      mode === "add"
        ? t("ADDED_", { text: modelName })
        : t("UPDATED_", { text: modelName })
    );
  }
  refresh();
};

const alertDelete = ref<InstanceType<typeof AlertDialog> | null>(null);
const deleteItem = (data: Crud) => {
  alertDelete.value?.show(data.name, data.id);
};
const onDelete = async (id: number) => {
  const { error } = await destroy(id);
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onDelete(t("DELETED"), t("DELETED_", { text: modelName }));
  }
  refresh();
};

const alertDeleteSelected = ref<InstanceType<typeof AlertDialog> | null>(null);
const deleteSelected = () => {
  alertDeleteSelected.value?.show(
    t("_SELECTED", {
      text: `${selected.value.length} ${modelName}`,
    })
  );
};
const onDeleteSelected = async () => {
  const { error } = await deletes(selected.value.map((ele) => ele.id!));
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onDelete(
      t("DELETED"),
      t("DELETED_", { text: t("_SELECTED", { text: modelName }) })
    );
  }
  selected.value = [];
  refresh();
};
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'p-4 sm:p-4' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-200 dark:divide-gray-700',
      },
      footer: { padding: 'p-4 sm:p-4' },
    }"
  >
    <template #header>
      <div class="flex flex-wrap max-md:items-baseline items-center gap-3">
        <h2
          class="font-bold text-xl text-gray-900 dark:text-white leading-tight shrink-0"
        >
          {{ modelName }}
        </h2>
        <div class="grow flex max-md:flex-col items-end justify-between gap-3">
          <UInput
            v-model="queryString.q"
            icon="i-fa6-solid-magnifying-glass"
            class="max-md:order-last"
            :placeholder="`${$t('SEARCH')}...`"
          />

          <UButton
            icon="i-fa6-solid-plus"
            :label="$t('ADD_', { text: $t('NEW_', { text: modelName }) })"
            @click="createItem"
          />
        </div>
      </div>
    </template>

    <UTable
      v-model="selected"
      :rows="data?.rows"
      by="id"
      :columns="columns"
      :loading="pending"
    >
      <template #actions-header>
        <div v-if="selected.length > 0" class="flex flex-1 justify-end gap-x-2">
          <UButton
            icon="i-fa6-solid-trash-can"
            color="error"
            size="2xs"
            :label="$t('_SELECTED', { text: $t('DELETE') })"
            @click="deleteSelected"
          />
        </div>
      </template>

      <template #actions-data="{ row }">
        <div class="flex flex-1 justify-end gap-x-2">
          <UTooltip :text="$t('EDIT')">
            <UButton
              icon="i-fa6-solid-pen-to-square"
              color="warning"
              size="2xs"
              :ui="{ rounded: 'rounded-full' }"
              @click="updateItem(row)"
            />
          </UTooltip>
          <UTooltip :text="$t('DELETE')">
            <UButton
              icon="i-fa6-solid-trash-can"
              color="error"
              size="2xs"
              :ui="{ rounded: 'rounded-full' }"
              @click="deleteItem(row)"
            />
          </UTooltip>
        </div>
      </template>
    </UTable>

    <template #footer>
      <div
        v-if="data"
        class="flex flex-wrap justify-between items-center gap-3 text-sm font-medium"
      >
        <ListDataSummary
          :total-item="data.totalItems"
          :total-page="data.totalPages"
          :current-page="queryString.page"
          :page-size="queryString.size"
        />
        <PaginationSize
          v-model:current-page="queryString.page"
          v-model:page-size="queryString.size"
          :total-item="data.totalItems"
          :total-page="data.totalPages"
        />
      </div>
    </template>
  </UCard>
  <FormsCrud ref="crudForm" @save="onSave!" />
  <AlertDialog ref="alertDelete" type="delete" @confirm="onDelete" />
  <AlertDialog
    ref="alertDeleteSelected"
    type="delete"
    @confirm="onDeleteSelected"
  />
</template>
