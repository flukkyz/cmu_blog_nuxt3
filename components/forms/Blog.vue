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

      <UFormGroup label="Conntent" name="content">
        <USelectMenu
          v-model="tags"
          v-model:query="searchTag"
          :options="tags"
          multiple
          searchable
          creatable
          clear-search-on-close
          :searchable-placeholder="`${$t('SEARCH')} ${$t('OR')} ${$t('ADD_', {
            text: ' Tags ',
          })}`"
          show-create-option-when="always"
          :placeholder="`${$t('SEARCH')} Tags`"
        >
          <template #label>
            <span v-if="tags.length" class="truncate">{{
              tags.map((ele) => ele.label).join(", ")
            }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>

      <UFormGroup label="Thumbnail" name="blog_img">
        <FileInput
          v-model="state.blog_img"
          image-only
          :oldFiles="state.Img"
          @remove-old-file="state.Img = undefined"
        />
      </UFormGroup>

      <UButton type="submit" size="xl"> Submit </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
interface Img {
  url: string;
}
export interface Blog {
  id?: number;
  title: string;
  content: string;
  tags: string;
  blog_img?: File;
  Img?: Img;
}
import { object, string } from "yup";

const mode = ref<Mode>("add");
const saving = ref<boolean>(false);

const schema = object({
  title: string().required("Required"),
  content: string(),
  tags: string(),
});

const emits = defineEmits<{
  (event: "save", value: Blog, mode?: Mode): void;
}>();

const state = ref<Blog>({
  title: "",
  content: "",
  tags: "",
});

const tags = ref<DefaultSelectOptions[]>([]);
const searchTag = ref<string>("");
watch(tags, () => {
  searchTag.value = "";
  state.value.tags = tags.value.map((ele) => ele.label).join(",");
});

const onSave = async () => {
  saving.value = true;
  emits("save", state.value, mode.value);
};

const bind = (data?: Blog) => {
  if (data) {
    mode.value = "edit";
    state.value = { ...state.value, ...data };
    if (state.value.Img) {
      state.value.Img.url = `${useRuntimeConfig().public.apiBase}${
        state.value.Img.url
      }`;
    }
    tags.value = state.value.tags
      ? state.value.tags.split(",").map((ele) => {
          return { label: ele };
        })
      : [];
  }
};

defineExpose({
  bind,
});
</script>
