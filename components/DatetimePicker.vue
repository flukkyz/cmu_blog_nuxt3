<script setup lang="ts">
import { UInput } from "#components";
import Datepicker from "@vuepic/vue-datepicker";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { locale, locales } = useI18n();

const props = withDefaults(
  defineProps<{
    modelValue?: string | null | Date | string[];
    range?: boolean;
    minDate?: string | Date;
    maxDate?: string | Date;
    prefixIcon?: string;
    dateOnly?: boolean;
    enableSeconds?: boolean;
    beYear?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    readonly?: boolean;
  }>(),
  {
    dateOnly: false,
    enableSeconds: false,
    beYear: false,
    clearable: false,
    disabled: false,
    readonly: false,
    prefixIcon: "i-fa6-solid-calendar-days",
    range: false,
  }
);

const datepicker = ref<DatePickerInstance>(null);
const inputRender = ref<typeof UInput | null>(null);

const openCalendar = () => {
  if (datepicker.value) {
    datepicker.value?.openMenu();
  }
};

const renderValue = computed(() => {
  if (props.modelValue) {
    if (props.range && isArray(props.modelValue)) {
      return `${datetime.toText(
        props.modelValue[0],
        "medium",
        props.dateOnly ? null : props.enableSeconds ? "long" : "short"
      )} - ${datetime.toText(
        props.modelValue[1],
        "medium",
        props.dateOnly ? null : props.enableSeconds ? "long" : "short"
      )}`;
    } else {
      return datetime.toText(
        props.modelValue as string,
        "medium",
        props.dateOnly ? null : props.enableSeconds ? "long" : "short"
      );
    }
  }
  return "";
});

const emits = defineEmits<{
  (e: "update:modelValue", value: null | string | string[]): void;
  (e: "input", value: null | string | string[]): void;
  (e: "change", value: null | string | string[]): void;
  (e: "blur", value: string | string[]): void;
  (e: "clear"): void;
}>();

const setReturnDatetime = (val: Date | Date[]) => {
  if (props.range && Array.isArray(val)) {
    const returnStartDateTime = props.dateOnly
      ? datetime.dt(datetime.format(val[0] as Date, "YYYY-MM-DD")).format()
      : datetime.dt(val[0] as Date).format();
    const returnEndDateTime = props.dateOnly
      ? datetime.dt(datetime.format(val[1] as Date, "YYYY-MM-DD")).format()
      : datetime.dt(val[1] as Date).format();
    return [returnStartDateTime, returnEndDateTime];
  } else {
    const returnDateTime = props.dateOnly
      ? datetime.dt(datetime.format(val as Date, "YYYY-MM-DD")).format()
      : datetime.dt(val as Date).format();
    return returnDateTime;
  }
};

const input = (val: Date | Date[]) => {
  const returnDateTime = setReturnDatetime(val);
  emits("update:modelValue", returnDateTime);
  emits("change", returnDateTime);
  emits("input", returnDateTime);
  inputRender.value?.onBlur();
};
const blur = (val: Date) => {
  const returnDateTime = setReturnDatetime(val);
  emits("blur", returnDateTime);
};
const onClearable = (): void => {
  emits("update:modelValue", props.range ? [] : null);
  emits("change", props.range ? [] : null);
  emits("clear");
};
</script>

<template>
  <UInput
    ref="inputRender"
    :model-value="renderValue"
    v-bind="{ ...$attrs }"
    readonly
    @click="openCalendar"
  >
    <template #leading>
      <UButton
        color="gray"
        size="xs"
        variant="link"
        :icon="prefixIcon"
        :padded="false"
        @click="openCalendar"
      />
    </template>
    <template #trailing>
      <UButton
        v-show="clearable && modelValue && !disabled"
        color="gray"
        size="xs"
        variant="link"
        icon="i-fa6-solid-xmark"
        :padded="false"
        @click="onClearable"
      />
    </template>
  </UInput>

  <Datepicker
    ref="datepicker"
    :model-value="modelValue"
    :range="range"
    :multi-calendars="range"
    :readonly="readonly"
    :disabled="disabled"
    :auto-apply="dateOnly"
    :min-date="minDate"
    :max-date="maxDate"
    :locale="useFind(locales, { code: locale })!.iso"
    :select-text="$t('SELECT')"
    :cancel-text="$t('CANCEL')"
    :action-row="{ showNow: true }"
    :now-button-label="dateOnly ? $t('TODAY') : $t('NOW')"
    time-picker-inline
    :clearable="false"
    :enable-time-picker="!dateOnly"
    :enable-seconds="enableSeconds"
    @update:model-value="input"
    @blur="blur"
  >
    <template #year="{ value }">
      {{ beYear || locale === "th" ? parseInt(value) + 543 : value }}
    </template>
    <template #year-overlay-value="{ text }">
      <div>
        {{ beYear || locale === "th" ? parseInt(text) + 543 : text }}
      </div>
    </template>
    <template #dp-input />
  </Datepicker>
</template>
