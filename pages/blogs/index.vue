<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
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
  size: 12,
  page: 1,
  q: "",
});
queryString.value = {
  ...queryString.value,
  ...useRoute().query,
};

const { pagination } = useBlog();

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
</script>

<template>
  <div class="flex flex-col gap-y-3">
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
          autofocus
          :placeholder="`${$t('SEARCH')}...`"
        />

        <UButton
          icon="i-fa6-solid-plus"
          :label="$t('ADD_', { text: $t('NEW_', { text: modelName }) })"
          :to="localePath({ name: 'blogs-create' })"
        />
      </div>
    </div>
    <div v-if="pending" class="">loading...</div>
    <div v-else-if="data" class="flex flex-col gap-y-5">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3"
      >
        <NuxtLink
          v-for="item in data?.rows"
          :key="item.id"
          :to="localePath({ name: 'blogs-slug', params: { slug: item.slug } })"
        >
          <UCard
            :ui="{
              base: 'w-full overflow-hidden',
              header: { padding: 'p-0 sm:p-0' },
              body: { padding: 'p-3 sm:p-3' },
              divide: '',
            }"
          >
            <template #header>
              <NuxtImg
                :src="item.Img ? item.Img.url : 'https://picsum.photos/400'"
                sizes="100vw"
                :provider="item.Img ? 'api' : ''"
              />
            </template>
            <div class="flex flex-col gap-y-2">
              <div class="h-14 overflow-hidden">
                <p class="text-lg font-semibold">{{ item.title }}</p>
              </div>
              <p class="text-gray-500 text-xs font-semibold">
                {{ item.Member?.firstname }} {{ item.Member?.lastname }}
              </p>
              <p class="text-gray-500 text-xs">
                {{ datetime.toText(item.createdAt!) }}
              </p>
            </div>
          </UCard>
        </NuxtLink>
      </div>
      <div
        class="flex flex-wrap justify-between items-center gap-3 text-sm font-medium"
      >
        <ListDataSummary
          :total-item="data.totalItems"
          :total-page="data.totalPages"
          :current-page="queryString.page"
          :page-size="queryString.size"
        />
        <UPagination
          v-model="queryString.page"
          :page-count="queryString.size"
          :total="data.totalItems"
        />
      </div>
    </div>
  </div>
</template>
