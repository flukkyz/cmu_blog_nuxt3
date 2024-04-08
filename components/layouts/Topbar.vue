<template>
  <div class="sticky top-0 max-md:py-3 md:py-1 shadow-xl bg-white z-10">
    <div
      class="container mx-auto max-md:px-3 flex items-center justify-between"
    >
      <UButton
        class="md:hidden"
        color="primary"
        variant="outline"
        @click="toggleDrawer"
        icon="i-fa6-solid-bars"
      />

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

      <UPopover :popper="{ placement: 'bottom-end' }">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
        <template #panel>
          <UVerticalNavigation :links="menu.profile" />
          <UDivider />
          <div class="flex flex-col">
            <UButton
              variant="link"
              :label="$t('LOGOUT')"
              icon="i-fa6-solid-right-from-bracket"
              :ui="{
                rounded: 'rounded-none',
              }"
              @click="onLogout()"
            />
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = authen();
const localePath = useLocalePath();
const router = useRouter();
const side = sidebar();
const menu = menus();

const toggleDrawer = () => {
  side.drawer = !side.drawer;
};
const onLogout = async () => {
  await auth.logout();
  router.push(localePath({ name: "login" }));
};

const links = [
  {
    label: "Profile",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/739984?v=4",
    },
    badge: 100,
  },
  {
    label: "Installation",
    icon: "i-heroicons-home",
    to: "/getting-started/installation",
  },
  {
    label: "Horizontal Navigation",
    icon: "i-heroicons-chart-bar",
    to: "/getting-started/installation",
  },
  {
    label: "Command Palette",
    icon: "i-heroicons-command-line",
    to: "/components/command-palette",
  },
];

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      side.drawer = false;
    },
  },
});
</script>
