<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    return !!route.query.code && !!route.query.state;
  },
  layout: "blank",
  middleware: "guest",
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
  <div class="flex items-center justify-center">
    <h1 class="display-2 text-center teal--text">Waiting for Authentication</h1>
  </div>
</template>
