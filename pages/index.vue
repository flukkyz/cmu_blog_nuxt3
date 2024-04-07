<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const dt2 = datetime.toText(new Date());
const dt3 = datetime.age(new Date());
const arr = "asdf";

const auth = authen();
const router = useRouter();
const localePath = useLocalePath();
const onLogout = async () => {
  await auth.logout();
  router.push(localePath({ name: "login" }));
};
</script>

<template>
  <div class="flex flex-col gap-y-5">
    <UButton label="Logout" @click="onLogout" />
    {{ dt2 }} ++ {{ dt3 }} ++ {{ charSwitch("asdf") }} ++
    {{ findSome("ฟห", arr) }} ++ {{ formatBytes(1515151515) }} ++
    {{ abbreviateNumber(5156565) }} ++
    {{ thaiIdCard.idCardToText("1529900565324") }} ++
    {{ $t("HOME") }}

    <UButton label="cruds page" :to="localePath({ name: 'cruds' })" />

    <p class="font-medium">Last Content</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <div
        v-for="item in 10"
        :key="item"
        class="border rounded-lg overflow-hidden"
      >
        <NuxtImg
          src="https://picsum.photos/1000"
          format="webp"
          width="300"
          height="169"
        />
        <p class="text-lg">title</p>
        <p class="text-gray-500">title</p>
      </div>
    </div>
  </div>
</template>
