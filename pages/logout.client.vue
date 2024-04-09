<script setup lang="ts">
const auth = authen();
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

definePageMeta({
  layout: "blank",
  middleware: "auth",
});
useHead({
  title: t("LOGOUT"),
});

await auth.logout();
router.push(localePath({ name: "login" }));
</script>

<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-gray-100 gap-y-5 px-10 sm:px-20 lg:px-40 xl:px-60 2xl:px-80"
  >
    <h1 class="text-3xl text-center text-primary">Logged out</h1>
    <UProgress animation="carousel" />
  </div>
</template>
