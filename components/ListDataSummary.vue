<template>
  <span>
    {{ $t("SHOWING") }}
    <span v-if="isMultiplePage">
      {{ currencyText(from) }}
      {{ $t("TO") }}
      {{ currencyText(Math.min(to)) }}
      {{ $t("OF") }}
    </span>
    {{ currencyText(totalItem) }}
    {{ totalItem > 1 ? $t("RESULTS") : $t("RESULT") }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalItem: number;
  totalPage: number;
  currentPage: number;
  pageSize: number;
}>();

const isMultiplePage = computed(() => props.totalPage > 1);

const from = computed(() => (props.currentPage - 1) * props.pageSize + 1);
const to = computed(() =>
  Math.min(
    props.currentPage * props.pageSize,
    props.totalItem || props.currentPage * props.pageSize
  )
);
</script>
