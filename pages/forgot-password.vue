<script setup lang="ts">
import { object, string } from "yup";
import { AlertDialog } from "#components";

const { t } = useI18n();
const localePath = useLocalePath();
const auth = authen();
const modelName = t("FORGOT_PASSWORD");

definePageMeta({
  layout: "blank",
  middleware: "guest",
});
useHead({
  title: modelName,
});

const state = reactive<Email>({
  email: "",
});

const schema = object({
  email: string()
    .trim()
    .test(
      "is-valid-email",
      t("INVALID", { text: " E-mail " }),
      (value: any) => !value || isEmail(value)
    )
    .required(t("IS_REQUIRED", { text: " E-mail " })),
});

const { error, status, send } = await auth.forgotPassword(state);

const noticeSended = ref<InstanceType<typeof AlertDialog> | null>(null);
const onSend = async () => {
  await send();
  if (error.value) {
    useIToast().onError(t("NOT_FOUND_ACCOUNT"), t("NOT_FOUND_ACCOUNT_DETAIL"));
  }
  if (status.value === "success") {
    noticeSended.value?.show();
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <UForm :schema :state class="space-y-4" @submit="onSend">
      <UCard class="min-w-80 shadow-xl">
        <template #header>
          <p class="font-bold text-2xl">
            {{ modelName }}
          </p>
          <p class="text-center text-sm text-gray-400">
            {{ $t("FORGOT_PASSWORD_DETAIL") }}
          </p>
        </template>

        <div class="flex flex-col gap-y-5">
          <UFormGroup label="E-mail" name="email">
            <UInput
              v-model="state.email"
              v-lowercase
              :disabled="status === 'pending'"
              autocomplete="off"
              autofocus
            />
          </UFormGroup>

          <UButton
            type="submit"
            block
            size="lg"
            :label="t('SEND')"
            :disabled="status === 'pending' || !state.email"
            :loading="status === 'pending'"
          />
          <UButton
            block
            variant="link"
            color="gray"
            size="lg"
            :label="t('GO_TO_', { text: t('LOGIN') })"
            :disabled="status === 'pending'"
            :to="localePath({ name: 'login' })"
          />
        </div>
      </UCard>
    </UForm>
  </div>
  <AlertDialog ref="noticeSended" type="notice" @close="state.email = ''">
    <div class="flex flex-col items-center justify-center gap-5">
      <UIcon
        name="i-fa6-solid-paper-plane"
        class="text-4xl text-info-600 shrink-0"
      />
      <div class="flex flex-col">
        <p class="text-sm text-gray-500 text-center">
          {{
            $t("SEND_EMAIL_SUCCESS", {
              email: state.email,
              before: $t("RESET_PASSWORD_EMAIL_BEFORE"),
              after: $t("RESET_PASSWORD_EMAIL_AFTER"),
            })
          }}
        </p>
      </div>
    </div>
  </AlertDialog>
</template>
