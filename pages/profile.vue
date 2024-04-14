<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const auth = authen();
const modelName = t("PROFILE");

await auth.fetchUser();

definePageMeta({
  middleware: "auth",
});
useHead({
  title: modelName,
});
breadcrumbs().setItems([
  {
    label: t("HOME"),
    to: localePath({ name: "index" }),
    icon: "i-fa6-solid-house",
  },
  {
    label: modelName,
    icon: "i-fa6-solid-cube",
  },
]);
</script>

<template>
  <div>
    <!-- <p class="truncate font-bold text-gray-900 text-base dark:text-white">
      {{ useCapitalize(auth.user?.firstname) }}
      {{ useCapitalize(auth.user?.lastname) }}
    </p>
    <p class="truncate font-medium text-sm text-gray-900 dark:text-white">
      {{ auth.user?.email }}
    </p> -->
    <p class="">LOGIN: {{ auth.loggedIn }}</p>
    <pre>
      {{ auth.user }}
    </pre>
  </div>
</template>
