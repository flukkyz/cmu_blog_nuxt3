<script setup lang="ts">
import type { FormsBlog } from "#components";
import type { Blog } from "~/components/forms/Blog.vue";

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useIToast();
const modelName = " Blog ";

definePageMeta({
  middleware: "auth",
  validate: async (route) => {
    return !!route.params.slug;
  },
});

const slug: string = useRoute().params.slug as string;
const { show } = useBlog();
const { data, pending } = await show(slug);

useSeoMeta(
  seoTag({
    title: t("EDIT_", { text: modelName }),
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
    label: data.value?.title!,
    to: localePath({ name: "blogs-slug", params: { slug: data.value?.slug } }),
  },
  {
    label: t("EDIT_", { text: modelName }),
  },
]);

const blogForm = ref<InstanceType<typeof FormsBlog> | null>(null);
onMounted(() => {
  blogForm.value?.bind(data.value!);
});

const save = async (data: Blog) => {
  const { error } = await useBlog().update(data.id!, data);
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onSuccess(t("UPDATED"), t("UPDATED_", { text: modelName }));
  }
  useRouter().push(localePath({ name: "blogs" }));
};
</script>

<template>
  <FormsBlog ref="blogForm" @save="save" />
</template>
