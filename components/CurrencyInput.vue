<script setup lang="ts">
import {
  CurrencyDisplay,
  type CurrencyInputOptions,
  type NumberRange,
  useCurrencyInput,
} from "vue-currency-input";

const props = withDefaults(
  defineProps<{
    name?: string;
    id?: string;
    modelValue?: number | null;
    min?: string | number;
    max?: string | number;
    precision?: string | number;
    integer?: boolean;
    placeholder?: string;
    variant?: "outline" | "none";
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
    inputClass?: string;
    color?: string;
    ui?: Object;
    icon?: string;
    trailingIcon?: string;
    leadingIcon?: string;
    loadingIcon?: string;
    disabled?: boolean;
    trailing?: boolean;
    padded?: boolean;
    leading?: boolean;
    autofocus?: boolean;
    autofocusDelay?: number;
    loading?: boolean;
    readonly?: boolean;
    required?: boolean;
  }>(),
  {
    disabled: false,
    trailing: false,
    padded: true,
    leading: false,
    autofocus: false,
    autofocusDelay: 100,
    loading: false,
    readonly: false,
    required: false,
    integer: false,
    errors: () => {
      return [];
    },
  }
);

const currencyInputOptions = ref<CurrencyInputOptions>({
  currency: "USD",
  currencyDisplay: "hidden" as CurrencyDisplay,
  valueRange: {} as NumberRange,
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: false,
});
if (props.min !== undefined) {
  currencyInputOptions.value.valueRange!.min =
    typeof props.min === "string" ? Number(props.min) : props.min;
}
if (props.max !== undefined) {
  currencyInputOptions.value.valueRange!.max =
    typeof props.max === "string" ? Number(props.max) : props.max;
}
if (props.integer) {
  currencyInputOptions.value.precision! = 0;
} else if (props.precision) {
  currencyInputOptions.value.precision! = Number(props.precision);
}

const { inputRef, setValue, setOptions, numberValue } = useCurrencyInput(
  currencyInputOptions.value
);

watch(
  () => props.modelValue,
  (value) => {
    setValue(value as number | null);
  }
);

watch(
  () => currencyInputOptions.value,
  (options) => {
    setOptions(options);
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
  (e: "input", value: number | null): void;
  (e: "change", value: number | null): void;
  (e: "blur", value: number | null): void;
}>();

const input = () => {
  setTimeout(() => {
    emits("input", numberValue.value);
  }, 1);
};
const change = () => {
  setTimeout(() => {
    emits("change", numberValue.value);
  }, 1);
};
const blur = () => {
  setTimeout(() => {
    emits("blur", numberValue.value);
  }, 1);
};
const selectAll = (event: Event) => {
  let value = event.target as HTMLInputElement;
  value.select();
};
</script>

<template>
  <UInput
    ref="inputRef"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    :disabled="disabled"
    :loading="loading"
    :variant="variant"
    :inputClass="inputClass"
    :color="color"
    :ui="ui"
    :size="size"
    :icon="icon"
    :trailingIcon="trailingIcon"
    :leadingIcon="leadingIcon"
    :loadingIcon="loadingIcon"
    :trailing="trailing"
    :autofocus="autofocus"
    :autofocusDelay="autofocusDelay"
    :padded="padded"
    :leading="leading"
    :required="required"
    @input="input"
    @change="change"
    @blur="blur"
    @click="selectAll"
  />
</template>
