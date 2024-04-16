<template>
  <UModal v-model="isOpen" preventClose>
    <UForm :schema="schema" :state="state" @submit="onSave">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-start justify-between">
            <p class="font-bold">CRUD</p>
            <UButton
              size="2xs"
              icon="i-fa6-solid-xmark"
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              @click="isOpen = false"
            />
          </div>
        </template>

        <UFormGroup label="Title" name="name">
          <UInput v-model="state.name" autofocus />
        </UFormGroup>

        <template #footer>
          <UButton type="submit"> Submit </UButton>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>

<script setup lang="ts">
export interface Crud {
  id?: number;
  name: string;
}
import { object, string } from "yup";

const isOpen = ref<boolean>(false);
const mode = ref<Mode>("add");
const saving = ref<boolean>(false);

const schema = object({
  name: string().required("Required"),
});

const emits = defineEmits<{
  (event: "save", value: Crud, mode?: Mode): void;
}>();

defineShortcuts({
  escape: {
    usingInput: true,
    handler: () => {
      isOpen.value = false;
    },
  },
});

const clearData = () => {
  state.value = { name: "" };
};

const state = ref({
  name: "",
});

const onSave = async () => {
  saving.value = true;
  isOpen.value = false;
  emits("save", state.value, mode.value);
};

const show = async (data?: Crud) => {
  saving.value = false;
  clearData();
  mode.value = "add";
  if (data) {
    mode.value = "edit";
    state.value = { ...state.value, ...data };
  }
  isOpen.value = true;
};

defineExpose({
  show,
});
</script>
