<script setup lang="ts">
definePageMeta({
  layout: "blank",
  middleware: "guest",
  validate: async (route) => {
    return !!route.query.code && !!route.query.state;
  },
});
useHead({
  title: "Authentication",
});

const auth = authen();
const localePath = useLocalePath();
const { code, state } = useRoute().query;
const router = useRouter();
await auth.callBack(code as string, state as string);
router.push(localePath({ name: "index" }));
</script>

<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-gray-100 gap-y-5 px-10 sm:px-20 lg:px-40 xl:px-60 2xl:px-80"
  >
    <h1 class="text-3xl text-center text-primary">
      Waiting for Authentication
    </h1>
    <UProgress animation="carousel" />
  </div>
</template>
