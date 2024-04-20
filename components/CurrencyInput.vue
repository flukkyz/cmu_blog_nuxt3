<script setup lang="ts">
import {
  CurrencyDisplay,
  type CurrencyInputOptions,
  type NumberRange,
  useCurrencyInput,
} from "vue-currency-input";

const props = withDefaults(
  defineProps<{
    modelValue?: number | null;
    min?: string | number;
    max?: string | number;
    precision?: string | number;
    integer?: boolean;
  }>(),
  {
    integer: false,
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

const slots = useSlots();

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
    v-bind="{ ...$attrs }"
    @input="input"
    @change="change"
    @blur="blur"
    @click="selectAll"
  >
    <template v-if="slots.leading" #leading>
      <slot name="leading"></slot>
    </template>
    <template v-if="slots.trailing" #trailing>
      <slot name="trailing"></slot>
    </template>
  </UInput>
</template>
