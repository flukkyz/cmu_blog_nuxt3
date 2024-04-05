<template>
  <ClientOnly fallback-tag="span" fallback="Loading layouts...">
    <layouts-topbar />
    <layouts-sidebar />
  </ClientOnly>
  <div class="container mx-auto">
    <slot />
  </div>
</template>
