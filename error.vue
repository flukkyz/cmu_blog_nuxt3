<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const setStatusTitle = (status: number) => {
  let title;
  switch (status) {
    case 400:
      title = "Bad Request";
      break;
    case 401:
      title = "Unauthorized";
      break;
    case 403:
      title = "Forbidden";
      break;
    case 404:
      title = "Not Found";
      break;
    case 405:
      title = "Method Not Allowed";
      break;
    case 408:
      title = "Request Timeout";
      break;
    case 413:
      title = "Request Entity Too Large";
      break;
    case 500:
      title = "Internal Server Error";
      break;
    case 502:
      title = "Bad Gateway";
      break;
    default:
      title = "An error occurred";
  }
  return title;
};

const { t } = useI18n();
const title = setStatusTitle(props.error?.statusCode!);
const detail = props.error?.statusCode
  ? t(`ERROR_TEXT_${props.error?.statusCode}`)
  : t("ERROR_TEXT_DEFAULT");

useHead({
  title: `${props.error?.statusCode} - ${title}`,
});

const handleError = () => {
  clearError({ redirect: "/" });
};

const auth = authen();
if (props.error?.statusCode === 401) {
  await auth.logout();
  setTimeout(async () => {
    handleError();
  }, 5000);
}
</script>

<template>
  <div
    v-if="error"
    class="flex justify-center items-center min-h-screen bg-gray-100"
  >
    <div class="">
      <NuxtImg
        src="/images/logo.png"
        format="webp"
        width="300"
        class="mx-auto"
      />
      <h1 class="text-center">
        {{ error.statusCode }}
      </h1>
      <h1 class="text-center mt-5">
        {{ title }}
      </h1>
      <p class="text-center error-detail mt-5">
        {{ detail }} {{ $t("PLEASE_CONTACT_STAFF") }}
      </p>
      <div class="d-flex justify-center align-center">
        <p class="title text-center mr-2 mt-4">Go to</p>
        <UButton @click="handleError" variant="link" label="Home page" />
      </div>
    </div>
  </div>
</template>
