<script setup lang="ts">
const auth = authen();
const side = sidebar();
const localePath = useLocalePath();
const menus = useReferences().menus;

const drawer = computed({
  get() {
    return side.drawer;
  },
  set(val) {
    side.drawer = val;
  },
});

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      side.drawer = false;
    },
  },
});
</script>

<template>
  <USlideover
    v-model="drawer"
    side="left"
    class="md:hidden"
    :ui="{ width: 'max-w-xs' }"
  >
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <NuxtLink :to="localePath({ name: 'index' })">
          <NuxtImg
            src="/images/logo.png"
            class="md:hidden"
            format="webp"
            width="40"
          />
        </NuxtLink>
      </template>

      <UVerticalNavigation class="h-full" :links="menus.frontend" />

      <template #footer>
        <div class="flex flex-col gap-y-3">
          <div class="flex items-center gap-x-3">
            <UAvatar
              :src="auth.user?.avatar"
              icon="i-fa6-solid-user"
              size="md"
              alt="Avatar"
            />
            <div class="text-left">
              <p
                class="truncate font-bold text-gray-900 text-base dark:text-white"
              >
                {{ useCapitalize(auth.user?.firstname) }}
                {{ useCapitalize(auth.user?.lastname) }}
              </p>
              <p
                class="truncate font-medium text-sm text-gray-900 dark:text-white"
              >
                {{ auth.user?.email }}
              </p>
            </div>
          </div>
          <UVerticalNavigation :links="menus.profile" />
        </div>
      </template>
    </UCard>
  </USlideover>
</template>
