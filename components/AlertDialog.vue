<script setup lang="ts">
const { t } = useI18n();

type DialogTypes = "notice" | "confirm" | "delete";

const props = withDefaults(
  defineProps<{
    type: DialogTypes;
    closeBtnColor?: string;
    closeBtnText?: string;
    confirmBtnColor?: string;
    confirmBtnText?: string;
    isCloseBtn?: boolean;
    size?: "sm" | "lg" | "xl";
  }>(),
  {
    closeBtnColor: "",
    confirmBtnColor: "",
    isCloseBtn: true,
  }
);

const titleText = ref<string>("");
const headerText = ref<string>(t("DELETE_DATA"));
const detailText = ref<string>(t("CONFIRM_DELETE"));

const isNotice = computed<boolean>(() => {
  return props.type === "notice";
});

const isDelete = computed<boolean>(() => {
  return props.type === "delete";
});

const renderCloseBtnText = computed<string>(() => {
  return props.closeBtnText
    ? props.closeBtnText
    : isNotice.value
    ? t("OK")
    : t("CANCEL");
});
const renderConfirmBtnText = computed<string>(() => {
  return props.confirmBtnText
    ? props.confirmBtnText
    : isDelete.value
    ? t("DELETE")
    : t("CONFIRM");
});

const renderSize = computed<string>(() => {
  return props.size
    ? `sm:max-w-${props.size}`
    : isNotice.value
    ? "sm:max-w-md"
    : isDelete.value
    ? "sm:max-w-sm"
    : "";
});

const isOpen = ref<boolean>(false);
const payload = ref<any | undefined>();

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      isOpen.value = false;
    },
  },
});

const emit = defineEmits<{
  (e: "confirm", payload: any): void;
  (e: "close", payload: any): void;
}>();

const onConfirm = (): void => {
  emit("confirm", payload.value);
  isOpen.value = false;
};
const onClose = (): void => {
  emit("close", payload.value);
  isOpen.value = false;
};

const show = (
  title?: string,
  data?: any,
  header?: string,
  detail?: string
): void => {
  payload.value = data;
  if (title) titleText.value = title;
  if (header) headerText.value = header;
  if (detail) detailText.value = detail;
  isOpen.value = true;
};

const close = (): void => {
  isOpen.value = false;
};

defineExpose({
  show,
  close,
});
</script>

<template>
  <UModal
    v-model="isOpen"
    prevent-close
    :ui="{ width: `w-full ${renderSize}` }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <div class="flex flex-col gap-y-5">
        <slot :payload="payload" :title="headerText" :detail="detailText">
          <div v-if="isDelete" class="flex items-center justify-center gap-x-3">
            <UIcon
              name="i-fa6-solid-trash-can"
              class="text-4xl text-error-600"
            />
            <div class="flex flex-col">
              <h1 v-if="headerText" class="text-xl font-bold text-error-600">
                {{ headerText }}
              </h1>
              <p v-if="detailText" class="text-sm text-error-600">
                {{ detailText }}
                {{ titleText }}
              </p>
            </div>
          </div>
        </slot>
        <div class="flex justify-evenly items-center">
          <UButton
            v-if="isCloseBtn"
            size="xl"
            :color="closeBtnColor || (isNotice ? 'info' : 'gray')"
            class="min-w-20 justify-center text-center"
            :label="renderCloseBtnText"
            @click="onClose"
          />

          <UButton
            v-if="!isNotice"
            size="xl"
            :color="confirmBtnColor || (isDelete ? 'error' : 'primary')"
            class="min-w-20 justify-center text-center"
            :label="renderConfirmBtnText"
            @click="onConfirm"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
