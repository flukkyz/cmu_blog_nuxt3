<script setup lang="ts">
const breadcrumbItems = breadcrumbs();
</script>

<template>
  <ClientOnly>
    <layouts-topbar />
    <layouts-sidebar />
  </ClientOnly>
  <div class="container mx-auto">
    <ClientOnly>
      <UBreadcrumb
        v-if="breadcrumbItems.hasItem()"
        class="px-3 py-1 mt-3"
        divider="i-fa6-solid-angle-right"
        :links="breadcrumbItems.items"
      />
    </ClientOnly>
    <div class="py-10 px-3">
      <slot />
    </div>
  </div>
</template>
