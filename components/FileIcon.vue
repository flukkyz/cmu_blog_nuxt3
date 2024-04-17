<script setup lang="ts">
defineProps<{
  name: string;
  url: string;
}>();
</script>

<template>
  <div class="file-icon">
    <img v-if="filename.isImage(name)" :src="url" class="rounded h-9" />
    <UIcon
      v-else-if="filename.isWord(name)"
      name="i-fa6-solid-file-word"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isPowerPoint(name)"
      name="i-fa6-solid-file-powerpoint"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isExcel(name)"
      name="i-fa6-solid-file-excel"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isCSV(name)"
      name="i-fa6-solid-file-csv"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isAudio(name)"
      name="i-fa6-solid-file-audio"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isVideo(name)"
      name="i-fa6-solid-file-video"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isCompressed(name)"
      name="i-fa6-solid-file-zipper"
      class="text-3xl"
    />
    <UIcon
      v-else-if="filename.isPDF(name)"
      name="i-fa6-solid-file-pdf"
      class="text-3xl"
    />
    <UIcon v-else name="i-fa6-solid-file" class="text-3xl" />
  </div>
</template>
