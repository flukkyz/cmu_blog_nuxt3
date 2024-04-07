<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const { locale, locales, setLocale, t } = useI18n();
const localePath = useLocalePath();
breadcrumbs().setItems([
  {
    label: t("HOME"),
    to: localePath({ name: "index" }),
    icon: "i-fa6-solid-house",
  },
  {
    label: "ABOUT",
    icon: "i-fa6-solid-cube",
  },
]);

const localeObj = useFind(locales.value, { code: locale.value });

const auth = authen();
</script>
<template>
  <div class="">
    <div v-if="auth.loggedIn" class="">
      {{ auth.user }}
    </div>
    <br />
    <br />
    {{ locale }}
    <br />
    <br />
    {{ locales }}
    <br />
    <br />
    <||
    {{ localeObj }}
    ||>
    <br />
    <br />
    <div>showLoading : {{ loading().showLoading }}</div>
    <br />
    <br />
    <UButton @click="setLocale('th')">TH</UButton>
    <UButton @click="setLocale('en')">EN</UButton>
    <br />
    <UButton label="cruds page" :to="localePath({ name: 'cruds' })" />
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
