<script setup lang="ts">
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
    placeholder?: string;
    prefix?: string;
    prefixIcon?: string;
    suffix?: string;
    suffixIcon?: string;
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

const openCalendar = () => {
  if (datepicker.value) {
    datepicker.value?.openMenu();
  }
};

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
  <div
    class="flex items-center rounded-md border bg-white border-gray-300 shadow-sm focus-within:ring-1 focus-within:border-primary-600 focus-within:ring-primary-600"
    :class="[
      disabled
        ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500'
        : '',
    ]"
  >
    <slot name="prefix">
      <div
        :class="[
          'flex items-center flex-shrink-0',
          disabled
            ? 'disabled:cursor-not-allowed disabled:text-gray-300'
            : 'cursor-pointer',
        ]"
        @click="openCalendar"
      >
        <div
          v-if="prefixIcon"
          class="h-5 w-5 flex items-center justify-center ml-2"
        >
          <UIcon
            :name="prefixIcon"
            :class="[disabled ? 'text-gray-300' : 'text-gray-500']"
          />
        </div>
        <span v-if="prefix" class="text-gray-500 sm:text-sm ml-2">
          {{ prefix }}
        </span>
      </div>
    </slot>

    <Datepicker
      :model-value="modelValue"
      ref="datepicker"
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
      :placeholder="placeholder"
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
      <template #dp-input="{ value }">
        <div
          class="block w-full border-0 p-0 bg-transparent pt-2 pb-1.5 placeholder-gray-400 focus:ring-0 sm:text-sm mx-2 focus:outline-none"
          :class="[
            disabled
              ? 'disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500'
              : 'cursor-pointer text-gray-900',
          ]"
        >
          <span v-if="value" class="font-normal">
            <span v-if="range">
              {{
                datetime.toText(
                  value.split(" - ")[0],
                  "medium",
                  dateOnly ? null : enableSeconds ? "long" : "short"
                )
              }}
              -
              {{
                datetime.toText(
                  value.split(" - ")[1],
                  "medium",
                  dateOnly ? null : enableSeconds ? "long" : "short"
                )
              }}
            </span>
            <span v-else>
              {{
                datetime.toText(
                  value,
                  "medium",
                  dateOnly ? null : enableSeconds ? "long" : "short"
                )
              }}
            </span>
          </span>
          <span class="text-gray-400 text-sm" v-else
            >{{ placeholder }}&nbsp;</span
          >
        </div>
      </template>
    </Datepicker>
    <div
      v-if="clearable && modelValue && !disabled"
      class="h-5 w-5 flex items-center justify-center mr-2"
    >
      <UIcon
        name="i-fa6-regular-circle-xmark"
        class="text-gray-300 hover:text-gray-dark cursor-pointer"
        @click="onClearable()"
      />
    </div>
    <slot name="suffix">
      <div class="pointer-events-none flex items-center flex-shrink-0">
        <span v-if="suffix" class="text-gray-500 sm:text-sm mr-2">
          {{ suffix }}
        </span>
        <div
          v-if="suffixIcon"
          class="h-5 w-5 flex items-center justify-center mr-2"
        >
          <i :class="suffixIcon" class="text-gray-500" />
        </div>
      </div>
    </slot>
  </div>
</template>

<style>
:root {
  --dp-font-family: "Noto Sans Thai", sans-serif !important;
}
</style>
