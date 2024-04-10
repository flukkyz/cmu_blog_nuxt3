<script setup lang="ts">
import { FormsCrud, AlertDialog } from "#components";
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

const alertNotice = ref<InstanceType<typeof AlertDialog> | null>(null);
const onNotice = () => {
  alertNotice.value?.show();
};
const alertConfirm = ref<InstanceType<typeof AlertDialog> | null>(null);
const onConfirm = () => {
  alertConfirm.value?.show();
};
const alertDelete = ref<InstanceType<typeof AlertDialog> | null>(null);
const onDelete = (data: Crud) => {
  alertDelete.value?.show(data.id, "Delete?", `Confirm delete ${data.name}?`);
};
const destroyItem = async (id: number) => {
  await destroy(id);
  refresh();
  loading().show();
};
</script>

<template>
  <UButton label="notice" @click="onNotice()" />
  <UButton label="confirm" @click="onConfirm()" />
  <div>
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
        <div class="flex items-center gap-x-3">
          <h2
            class="font-bold text-xl text-gray-900 dark:text-white leading-tight"
          >
            CRUDs
          </h2>
          <UInput
            v-model="queryString.q"
            icon="i-fa6-solid-magnifying-glass"
            placeholder="Search..."
          />

          <UButton label="Create" @click="createItem" class="ml-auto" />
        </div>
      </template>

      <UTable :rows="data?.rows" :columns="columns" :loading="pending">
        <template #actions-data="{ row }">
          <div class="flex flex-1 justify-end gap-x-2 text-lg">
            <UTooltip :text="$t('EDIT')">
              <UButton
                icon="i-fa6-solid-pen-to-square"
                color="warning"
                size="2xs"
                :ui="{ rounded: 'rounded-full' }"
                @click="updateItem(row)"
              />
            </UTooltip>
            <UButton
              icon="i-fa6-solid-trash-can"
              color="error"
              size="2xs"
              :ui="{ rounded: 'rounded-full' }"
              @click="onDelete(row)"
            />
          </div>
        </template>
      </UTable>

      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <span class="text-sm">
            Showing
            <span class="font-medium">
              {{ (queryString.page - 1) * queryString.size + 1 }}
            </span>
            to
            <span class="font-medium">
              {{
                Math.min(
                  queryString.page * queryString.size,
                  data?.totalItems || queryString.page * queryString.size
                )
              }}
            </span>
            of
            <span class="font-medium">{{ data?.totalItems }}</span>
            results
          </span>

          <div class="flex items-center gap-x-3">
            Rows per page
            <USelect
              v-model="queryString.size"
              :options="references().rowsPerPages"
              class="w-20"
            />
            <UPagination
              v-model="queryString.page"
              :page-count="queryString.size"
              :total="data?.totalItems"
            />
          </div>
        </div>
      </template>
    </UCard>
  </div>
  <FormsCrud ref="crudForm" @save="onSave!" />
  <AlertDialog ref="alertNotice" type="notice">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, ea
    ipsam sequi assumenda porro esse mollitia repellendus quo, rerum quod labore
    architecto vero error aliquam. Id neque unde repellendus assumenda?
  </AlertDialog>
  <AlertDialog ref="alertDelete" type="delete" @confirm="destroyItem" />
  <AlertDialog ref="alertConfirm" type="confirm">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, ea
    ipsam sequi assumenda porro esse mollitia repellendus quo, rerum quod labore
    architecto vero error aliquam. Id neque unde repellendus assumenda?
  </AlertDialog>
</template>
