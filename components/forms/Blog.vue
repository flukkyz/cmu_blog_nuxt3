<template>
  <UForm :schema="schema" :state="state" @submit="onSave">
    <div class="flex flex-col gap-y-5">
      <p class="font-bold">Blog</p>

      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" autofocus />
      </UFormGroup>

      <UFormGroup label="Content" name="content" class="prose max-w-none">
        <CustomCkEditor v-model="state.content" />
      </UFormGroup>

      <UFormGroup label="Tags" name="tags">
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
            <div v-if="tags.length" class="flex flex-wrap gap-1">
              <UBadge
                v-for="(val, index) in tags"
                :key="`tags-${index}`"
                :label="val.label"
                color="info"
              />
            </div>
          </template>
        </USelectMenu>
      </UFormGroup>

      <UFormGroup :label="$t('IMAGE')" name="blog_img">
        <FileInput
          v-model="state.blog_img"
          image-only
          :old-files="state.Img"
          @remove-old-file="removeOldImage()"
        />
      </UFormGroup>

      <UButton
        type="submit"
        size="xl"
        :label="$t('SAVE')"
        class="justify-center"
      />
    </div>
  </UForm>
  <AlertDialog ref="alertDelete" type="delete" @confirm="onRemoveOldImage()" />
</template>

<script setup lang="ts">
import { AlertDialog } from "#components";
import { object, string, mixed } from "yup";
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

const { t } = useI18n();

const mode = ref<Mode>("add");
const saving = ref<boolean>(false);

const schema = object({
  title: string()
    .trim()
    .required(t("IS_REQUIRED", { text: " Title " })),
  content: string()
    .trim()
    .required(t("IS_REQUIRED", { text: " Content " })),
  tags: string().trim(),
  blog_img: mixed()
    .test(
      "is-valid-type",
      t("IMG_ONLY"),
      (value: any) => !value || (!!value && filename.isImage(value.name))
    )
    .test(
      "is-valid-size",
      t("LESS_SIZE", { text: t("FILE"), count: "1 MB" }),
      (value: any) => !value || (!!value && value.size <= 1000000)
    ),
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

const toast = useIToast();
const { removeImage } = useBlog();
const alertDelete = ref<InstanceType<typeof AlertDialog> | null>(null);
const removeOldImage = () => {
  alertDelete.value?.show(t("IMAGE"));
};
const onRemoveOldImage = async () => {
  const { error } = await removeImage(state.value.id!);
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  } else {
    toast.onDelete(t("DELETED"), t("DELETED_", { text: t("IMAGE") }));
    state.value.Img = undefined;
  }
};

const onSave = async () => {
  saving.value = true;
  emits("save", state.value, mode.value);
};

const bind = (data?: Blog) => {
  if (data) {
    mode.value = "edit";
    console.log(data);

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
