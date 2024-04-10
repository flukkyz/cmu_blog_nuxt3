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
    header?: string;
    isCloseBtn?: boolean;
  }>(),
  {
    closeBtnColor: "",
    confirmBtnColor: "",
    isCloseBtn: true,
  }
);

const dialogDetailTitle = ref<string>("");
const dialogDetailDetail = ref<string>("");

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
  return props.confirmBtnText ? props.confirmBtnText : t("CONFIRM");
});

const isOpen = ref<boolean>(false);
const payload = ref<any | undefined>();

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

const show = (data?: any, title?: string, detail?: string): void => {
  payload.value = data;
  if (title) dialogDetailTitle.value = title;
  if (detail) dialogDetailDetail.value = detail;
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
  <UModal v-model="isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <div class="flex flex-col gap-y-5">
        <slot>
          <div v-if="isDelete" class="flex flex-col">
            <UIcon name="i-fa6-solid-trash-can" class="text-xl" />
            <h1 v-if="dialogDetailTitle">
              {{ dialogDetailTitle }}
            </h1>
            <p v-if="dialogDetailDetail">
              {{ dialogDetailDetail }}
            </p>
          </div>
        </slot>
        <div class="flex justify-evenly items-center">
          <UButton
            v-if="isCloseBtn"
            size="xl"
            :color="isNotice ? 'info' : 'gray'"
            :class="closeBtnColor || (isNotice ? 'px-8' : '')"
            :label="renderCloseBtnText"
            @click="onClose"
          />

          <UButton
            v-if="!isNotice"
            size="xl"
            :color="confirmBtnColor || (isDelete ? 'error' : 'primary')"
            :label="renderConfirmBtnText"
            @click="onConfirm"
          />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
