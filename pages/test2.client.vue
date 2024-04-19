<script setup lang="ts">
const { t } = useI18n();

const text = t("ABOUT");
const date = ref<Date>(new Date());
</script>

<template>
  <DatetimePicker v-model="date" />
  <br />
  <br />
  <br />
  {{ $t("ATTACH_FILE_", { text: $t("COUNTRY") }) }}
  <br />
  {{ text }}
  <br />
  {{ currencyText(134534534) }}
</template>
