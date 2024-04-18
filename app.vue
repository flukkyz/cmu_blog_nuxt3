<template>
  <NuxtLayout>
    <NuxtPwaManifest />
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <UNotifications />
    <BackToTop />
  </ClientOnly>
</template>
