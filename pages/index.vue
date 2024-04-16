<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const modelName = " Latest Blogs ";

useHead({
  title: modelName,
});
breadcrumbs().clear();

const { pagination } = useBlog();

const { data, pending, refresh } = await pagination({ size: 12 });
</script>

<template>
  <div class="flex flex-col gap-y-3">
    <h2
      class="font-bold text-xl text-gray-900 dark:text-white leading-tight shrink-0"
    >
      {{ modelName }}
    </h2>
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
              <NuxtImg src="https://picsum.photos/400" sizes="100vw" />
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
      <ULink
        :to="localePath({ name: 'blogs' })"
        class="text-right text-primary font-medium"
      >
        {{ $t("SHOW_MORE") }}...
      </ULink>
    </div>
  </div>
</template>
