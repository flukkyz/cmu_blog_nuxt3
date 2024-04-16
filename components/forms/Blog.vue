<template>
  <UForm :schema="schema" :state="state" @submit="onSave">
    <div class="flex flex-col gap-y-3">
      <p class="font-bold">Blog</p>

      <UFormGroup label="Title" name="name">
        <UInput v-model="state.title" autofocus />
      </UFormGroup>

      <UFormGroup label="Conntent" name="content">
        <UTextarea v-model="state.content" />
      </UFormGroup>

      <UButton type="submit" size="xl"> Submit </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
export interface Blog {
  id?: number;
  title: string;
  content: string;
}
import { object, string } from "yup";

const mode = ref<Mode>("add");
const saving = ref<boolean>(false);

const schema = object({
  title: string().required("Required"),
  content: string(),
});

const emits = defineEmits<{
  (event: "save", value: Blog, mode?: Mode): void;
}>();

const state = ref<Blog>({
  title: "",
  content: "",
});

const onSave = async () => {
  saving.value = true;
  emits("save", state.value, mode.value);
};

const bind = (data?: Blog) => {
  if (data) {
    mode.value = "edit";
    state.value = { ...state.value, ...data };
  }
};

defineExpose({
  bind,
});
</script>
