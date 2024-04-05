<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const auth = authen();
</script>
<template>
  <div class="">
    <div v-if="auth.loggedIn" class="">
      {{ auth.user }}
    </div>
    {{ locale }}
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
