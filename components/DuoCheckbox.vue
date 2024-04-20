<template>
  <div :class="['flex gap-5', { 'flex-row-reverse': swap }]">
    <UCheckbox v-model="ct" :label="renderTrueLabel" />
    <UCheckbox v-model="cf" :label="renderFalseLabel" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel();
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    trueLabel?: string;
    falseLabel?: string;
    swap?: boolean;
  }>(),
  {
    swap: false,
  }
);

const emits = defineEmits<{
  (e: "change", value: boolean): void;
}>();

const renderTrueLabel = computed(() => {
  return props.trueLabel ? props.trueLabel : t("YES");
});
const renderFalseLabel = computed(() => {
  return props.falseLabel ? props.falseLabel : t("NO");
});
const ct = ref<boolean>(false);
const cf = ref<boolean>(false);

if (model.value) {
  ct.value = true;
  cf.value = false;
} else {
  ct.value = false;
  cf.value = true;
}

watch(ct, () => {
  if (ct.value) {
    model.value = true;
    cf.value = false;
    emits("change", true);
  } else {
    model.value = false;
    cf.value = true;
    emits("change", false);
  }
});
watch(cf, () => {
  if (cf.value) {
    model.value = false;
    ct.value = false;
    emits("change", false);
  } else {
    model.value = true;
    ct.value = true;
    emits("change", true);
  }
});
</script>
