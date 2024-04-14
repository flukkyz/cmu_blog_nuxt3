<template>
  <div class="flex flex-wrap items-center gap-3">
    <div class="flex items-center gap-x-2">
      <p class="text-gray-500">
        {{ $t("ROWS_PER_PAGE") }}
      </p>
      <USelect
        v-model="pageSize"
        :options="useReferences().rowsPerPages"
        class="w-24"
      />
    </div>
    <div v-if="isMultiplePage" class="flex items-center gap-x-2">
      <p class="text-gray-500">
        {{ $t("PAGE") }}
      </p>
      <UPagination
        v-model="currentPage"
        :page-count="pageSize"
        :total="totalItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  totalItem: number;
  totalPage: number;
}>();

const currentPage = defineModel("currentPage", { required: true });
const pageSize = defineModel("pageSize", { required: true });

const isMultiplePage = computed(() => props.totalPage > 1);
</script>
