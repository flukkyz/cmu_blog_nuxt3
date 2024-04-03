<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const aaa = localePath("cruds", "en");
const bbb = localePath({ name: "index" }, "en");
console.log("bbb", bbb);
</script>
<template>
  <div class="">
    {{ locale }}
    <div>showLoading : {{ loading().showLoading }}</div>
    localePath : {{ localePath("cruds") }} | aaa:
    {{ aaa }}
    ||
    {{ bbb }}
    <br />
    <br />
    <UButton @click="setLocale('th')">TH</UButton>
    <NuxtLinkLocale to="cruds">
      <UButton>cruds</UButton>
    </NuxtLinkLocale>
    <NuxtLink :to="localePath('index')">{{ $t("HOME") }}</NuxtLink>
  </div>
  <div>
    aaa
    <UIcon name="i-heroicons-light-bulb" />
    <UIcon name="i-mdi-account" />
    <UIcon name="i-fa6-solid-user" />
    <UIcon name="i-heroicons-user" />
    aaa
  </div>
</template>
