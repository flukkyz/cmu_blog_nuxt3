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
        :links="breadcrumbItems.items"
      />
    </ClientOnly>
    <slot />
  </div>
</template>
