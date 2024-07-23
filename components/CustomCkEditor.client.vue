<template>
  <ckeditor v-model="model" :editor="ClassicEditor" :config />
</template>

<script setup lang="ts">
import ClassicEditor from "~/libs/CustomEditor";
const model = defineModel<string>("");

const runtimeConfig = useRuntimeConfig();
const baseURL = `${runtimeConfig.public.apiBase}${runtimeConfig.public.apiPath}`;
const accessToken = useCookie("accessToken");

const config = {
  simpleUpload: {
    uploadUrl: `${baseURL}upload-img/`, // Change this to your upload URL
    headers: accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {},
  },
};
</script>
