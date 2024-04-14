<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const modelName = t("ABOUT");

definePageMeta({
  middleware: "auth",
});
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
    <p class="">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Adipiscing elit
      pellentesque habitant morbi tristique senectus et. Dignissim convallis
      aenean et tortor at risus viverra adipiscing at. Suspendisse potenti
      nullam ac tortor vitae. Eros donec ac odio tempor orci dapibus ultrices
      in. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus.
      Sed elementum tempus egestas sed sed risus pretium. At augue eget arcu
      dictum varius duis. Massa placerat duis ultricies lacus sed. Sed
      adipiscing diam donec adipiscing tristique risus nec feugiat in. Phasellus
      egestas tellus rutrum tellus pellentesque. Ultrices vitae auctor eu augue
      ut lectus arcu.
    </p>
    <p class="">
      Odio tempor orci dapibus ultrices. Amet venenatis urna cursus eget nunc
      scelerisque viverra mauris in. Odio ut sem nulla pharetra diam sit amet.
      Amet justo donec enim diam vulputate. Massa placerat duis ultricies lacus
      sed. Malesuada fames ac turpis egestas maecenas pharetra convallis
      posuere. Venenatis cras sed felis eget velit. Est sit amet facilisis magna
      etiam tempor orci eu. Neque gravida in fermentum et sollicitudin ac.
      Egestas dui id ornare arcu. Duis at tellus at urna condimentum mattis.
      Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
    </p>
    <p class="">
      Elementum integer enim neque volutpat ac tincidunt vitae semper. Sapien
      eget mi proin sed libero enim sed. Placerat orci nulla pellentesque
      dignissim enim sit amet venenatis urna. Rhoncus mattis rhoncus urna neque.
      Libero volutpat sed cras ornare arcu dui vivamus arcu. Tristique senectus
      et netus et malesuada. Est pellentesque elit ullamcorper dignissim cras
      tincidunt lobortis feugiat. Porttitor eget dolor morbi non arcu risus
      quis. Arcu felis bibendum ut tristique et egestas quis ipsum. Id interdum
      velit laoreet id. Massa id neque aliquam vestibulum morbi blandit cursus.
      Magna ac placerat vestibulum lectus mauris ultrices eros in. Enim diam
      vulputate ut pharetra sit amet aliquam. Pellentesque diam volutpat commodo
      sed egestas egestas fringilla phasellus. Ultrices in iaculis nunc sed
      augue lacus. Sed elementum tempus egestas sed sed risus. Arcu odio ut sem
      nulla pharetra diam sit amet nisl.
    </p>
    <p class="">
      Risus ultricies tristique nulla aliquet enim tortor at auctor. Dignissim
      sodales ut eu sem integer vitae justo eget. Pulvinar proin gravida
      hendrerit lectus a. Diam volutpat commodo sed egestas egestas fringilla
      phasellus. Aliquet porttitor lacus luctus accumsan tortor. Egestas dui id
      ornare arcu odio. Sit amet consectetur adipiscing elit duis tristique
      sollicitudin. Nulla pellentesque dignissim enim sit amet venenatis urna
      cursus. Facilisis mauris sit amet massa vitae tortor condimentum lacinia
      quis. Massa enim nec dui nunc mattis enim. Cursus metus aliquam eleifend
      mi in nulla posuere. Id velit ut tortor pretium viverra suspendisse.
      Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum
      sociis. A condimentum vitae sapien pellentesque habitant morbi tristique
      senectus. Semper auctor neque vitae tempus.
    </p>
    <p class="">
      Vitae tortor condimentum lacinia quis vel eros donec ac. Nunc faucibus a
      pellentesque sit amet porttitor eget dolor morbi. Orci phasellus egestas
      tellus rutrum. Enim blandit volutpat maecenas volutpat blandit aliquam
      etiam. Magna sit amet purus gravida quis blandit turpis cursus in. Est sit
      amet facilisis magna etiam tempor orci eu lobortis. Risus ultricies
      tristique nulla aliquet enim tortor at. Risus ultricies tristique nulla
      aliquet enim tortor. Ornare lectus sit amet est placerat in egestas. Non
      curabitur gravida arcu ac. Posuere sollicitudin aliquam ultrices sagittis
      orci a. Amet nisl purus in mollis nunc sed id semper. Rhoncus aenean vel
      elit scelerisque. Condimentum vitae sapien pellentesque habitant morbi
      tristique. In tellus integer feugiat scelerisque varius morbi enim.
      Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Ornare
      aenean euismod elementum nisi. Fringilla urna porttitor rhoncus dolor
      purus non enim praesent elementum.
    </p>
  </div>
</template>
