<script setup lang="ts">
import type { Blog } from "~/components/forms/Blog.vue";

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useIToast();
const modelName = " Blog ";

definePageMeta({
  middleware: "auth",
});
useSeoMeta(
  seoTag({
    title: t("ADD_", { text: modelName }),
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
    to: localePath({ name: "blogs" }),
    icon: "i-fa6-solid-blog",
  },
  {
    label: t("ADD_", { text: modelName }),
  },
]);

const save = async (data: Blog) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      formData.append(key, value);
    }
  }
  const { error } = await useBlog().create(formData);
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onSuccess(t("ADDED"), t("ADDED_", { text: modelName }));
  }
  useRouter().push(localePath({ name: "blogs" }));
};
</script>

<template>
  <FormsBlog @save="save" />
</template>
