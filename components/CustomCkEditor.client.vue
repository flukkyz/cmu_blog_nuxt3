<template>
  <div class="prose max-w-none">
    <ckeditor :editor="ClassicEditor" :value="model" :config @input="input" />
  </div>
</template>

<script setup lang="ts">
import ClassicEditor from "~/libs/CustomEditor";
const model = defineModel<string>();
const input = (event: string) => {
  model.value = event;
};

const config = {
  simpleUpload: {
    uploadUrl: "http://localhost:5000/api/test2", // Change this to your upload URL
    headers: {
      "X-CSRF-TOKEN": "CSRF-Token",
      Authorization: "Bearer <JSON Web Token>",
    },
  },
};
</script>
