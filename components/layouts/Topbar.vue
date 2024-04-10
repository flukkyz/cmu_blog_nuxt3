<script setup lang="ts">
import type { LocaleObject } from "@nuxtjs/i18n";

const auth = authen();
const { setLocale, locales, t } = useI18n();
const localePath = useLocalePath();
const side = sidebar();
const menu = menus();

const toggleDrawer = () => {
  side.drawer = !side.drawer;
};

const profileMenus = computed(() => [
  [
    {
      slot: "account",
      disabled: true,
    },
  ],
  ...menu.profile,
]);

const languages = computed(() =>
  locales.value.map((ele: LocaleObject) => {
    return {
      label: ele.name,
      click: () => setLocale(ele.code),
    };
  })
);
</script>

<template>
  <div class="sticky top-0 max-md:py-3 md:py-1 shadow bg-white z-10">
    <div
      class="container mx-auto max-md:px-3 flex items-center justify-between"
    >
      <UButton
        class="md:hidden"
        color="primary"
        variant="ghost"
        @click="toggleDrawer"
        icon="i-fa6-solid-bars"
      />

      <div class="flex gap-x-2">
        <NuxtLink :to="localePath({ name: 'index' })">
          <NuxtImg
            src="/images/logo.png"
            class="max-md:hidden"
            format="webp"
            width="60"
          />
          <NuxtImg
            src="/images/logo.png"
            class="md:hidden"
            format="webp"
            width="40"
          />
        </NuxtLink>

        <UHorizontalNavigation
          class="max-md:hidden"
          :links="menu.frontend.flat(1)"
        />
      </div>

      <div class="flex gap-x-2">
        <UDropdown
          v-if="auth.loggedIn"
          :items="profileMenus"
          class="max-md:hidden"
          :popper="{ placement: 'bottom-end' }"
        >
          <UAvatar
            :src="auth.user?.avatar"
            icon="i-fa6-solid-user"
            alt="Avatar"
          />
          <template #account="{ item }">
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
          </template>
          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>
            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template>
        </UDropdown>
        <UHorizontalNavigation v-else :links="menu.guest" />
        <UDropdown
          :items="[languages]"
          :popper="{ placement: 'bottom-end' }"
          :ui="{ width: 'w-28' }"
        >
          <UButton
            color="primary"
            variant="ghost"
            icon="i-fa6-solid-language"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>
