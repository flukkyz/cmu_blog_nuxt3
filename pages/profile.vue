<script setup lang="ts">
const auth = authen();
await auth.fetchUser();

// definePageMeta({
//   middleware: "auth",
// });
</script>

<template>
  <div>
    <!-- <p class="truncate font-bold text-gray-900 text-base dark:text-white">
      {{ useCapitalize(auth.user?.firstname) }}
      {{ useCapitalize(auth.user?.lastname) }}
    </p>
    <p class="truncate font-medium text-sm text-gray-900 dark:text-white">
      {{ auth.user?.email }}
    </p> -->
    <p class="">LOGIN: {{ auth.loggedIn }}</p>
    <pre>
      {{ auth.user }}
    </pre>
  </div>
</template>
