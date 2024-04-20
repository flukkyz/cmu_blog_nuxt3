<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const auth = authen();
const modelName = " Latest Blogs ";

const state = ref({
  search: "",
});

const onSearch = () => {
  useRouter().push(
    localePath({ name: "blogs", query: { q: state.value.search } })
  );
};

useHead({
  title: modelName,
});
breadcrumbs().clear();

const queryString = ref({
  size: 12,
});
const { pagination } = useBlog();
const { data, pending } = await pagination(queryString);
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
        <UForm class="space-y-4" :state="state" @submit="onSearch">
          <UInput
            v-model="state.search"
            class="max-md:order-last"
            autofocus
            :placeholder="`${$t('SEARCH')}...`"
          >
            <template #trailing>
              <UIcon
                name="i-fa6-solid-magnifying-glass"
                class="cursor-pointer text-xl text-gray-400"
                @click="onSearch"
              />
            </template>
          </UInput>
        </UForm>

        <UButton
          v-if="auth.loggedIn"
          icon="i-fa6-solid-plus"
          :label="$t('ADD_', { text: $t('NEW_', { text: ' Blog ' }) })"
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
              header: {
                base: `h-48 flex items-center justify-center ${
                  item.Img ? 'overflow-hidden' : ''
                }`,
                padding: 'p-0 sm:p-0',
              },
              body: { padding: 'p-3 sm:p-3' },
              divide: '',
            }"
          >
            <template #header>
              <img
                v-if="item.Img"
                :src="`${useRuntimeConfig().public.apiBase}${item.Img.url}`"
                height="128"
              />
              <img v-else src="/images/logo.png" height="128" />
            </template>
            <div class="flex flex-col gap-y-2">
              <div class="h-14 overflow-hidden">
                <p class="text-lg font-semibold">{{ item.title }}</p>
              </div>
              <p class="text-gray-500 text-xs font-semibold">
                {{ item.Member?.firstname }} {{ item.Member?.lastname }}
              </p>
              <p class="text-gray-500 text-xs">
                {{ datetime.fromNow(item.createdAt!) }}
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
