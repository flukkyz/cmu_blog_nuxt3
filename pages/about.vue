<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const modelName = t("ABOUT");

useHead({
  title: modelName,
});

breadcrumbs().setItems([
  {
    label: t("HOME"),
    to: localePath({ name: "index" }),
    icon: "i-fa6-solid-house",
  },
  {
    label: t("ABOUT"),
    icon: "i-fa6-solid-circle-info",
  },
]);
</script>
<template>
  <div class="flex flex-col gap-y-3">
    <h2 class="font-bold text-xl text-gray-900 dark:text-white">
      {{ modelName }}
    </h2>
    <UCard>
      <p class="text-lg font-semibold">Backend</p>
      <p class="text-xs text-gray-500">
        Example Backend on Node.js + Sequelize (Node 18+ Required)
      </p>
      <p class="text-info-600 mt-2">
        <a
          href="https://github.com/flukkyz/cmu_blog_nuxt3_api"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/flukkyz/cmu_blog_nuxt3_api
        </a>
      </p>
    </UCard>
    <UCard>
      <p class="text-lg font-semibold">Frontend</p>
      <p class="text-xs text-gray-500">Example Frontend on Nuxt 3</p>
      <p class="text-info-600 mt-2">
        <a
          href="https://github.com/flukkyz/cmu_blog_nuxt3"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/flukkyz/cmu_blog_nuxt3
        </a>
      </p>
    </UCard>
  </div>
</template>
