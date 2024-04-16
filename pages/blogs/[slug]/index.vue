<script setup lang="ts">
import { AlertDialog } from "#components";

const { t } = useI18n();
const localePath = useLocalePath();
const modelName = " Blog ";

definePageMeta({
  middleware: "auth",
  validate: async (route) => {
    return !!route.params.slug;
  },
});

const slug: string = useRoute().params.slug as string;
const { show, destroy } = useBlog();
const { data, pending } = await show(slug);

useSeoMeta(
  seoTag({
    title: data.value?.title,
    description: data.value?.content,
    keywords: data.value?.tags,
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
    to: localePath({ name: "blogs" }),
    icon: "i-fa6-solid-blog",
  },
  {
    label: data.value?.title!,
  },
]);

const alertDelete = ref<InstanceType<typeof AlertDialog> | null>(null);
const deleteItem = () => {
  alertDelete.value?.show(data.value?.title, data.value?.id);
};
const toast = useIToast();
const onDelete = async (id: number) => {
  const { error } = await destroy(id);
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onDelete(t("DELETED"), t("DELETED_", { text: modelName }));
  }
  useRouter().push(localePath({ name: "blogs" }));
};
</script>

<template>
  <div v-if="pending" class="">loading...</div>
  <div v-else-if="data" class="flex flex-col gap-y-3">
    <div class="flex items-center justify-between gap-x-2">
      <h2 class="font-bold text-xl text-gray-900 dark:text-white">
        {{ data.title }}
      </h2>
      <div class="flex flex-1 justify-end gap-x-2">
        <UTooltip :text="$t('EDIT')">
          <UButton
            icon="i-fa6-solid-pen-to-square"
            color="warning"
            size="2xs"
            :ui="{ rounded: 'rounded-full' }"
            :to="
              localePath({
                name: 'blogs-slug-update',
                params: { slug: data.slug },
              })
            "
          />
        </UTooltip>
        <UTooltip :text="$t('DELETE')">
          <UButton
            icon="i-fa6-solid-trash-can"
            color="error"
            size="2xs"
            :ui="{ rounded: 'rounded-full' }"
            @click="deleteItem()"
          />
        </UTooltip>
      </div>
    </div>
    <NuxtImg
      provider="api"
      src="/uploads/blogs/F30B2BE226A378005163969C77DFDD9BE31382A3.jpg"
      class="mx-auto"
    />
    <div class="" v-html="data.content" />
  </div>
  <AlertDialog ref="alertDelete" type="delete" @confirm="onDelete" />
</template>
