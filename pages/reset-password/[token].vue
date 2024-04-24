<script setup lang="ts">
import { object, string } from "yup";

const { t } = useI18n();
const localePath = useLocalePath();
const auth = authen();
const modelName = t("RESET_PASSWORD");

definePageMeta({
  layout: "blank",
  middleware: "guest",
  validate: async (route) => {
    return !!route.params.token;
  },
});
useHead({
  title: modelName,
});

const token: string = useRoute().params.token as string;

await auth.checkResetPasswordToken(token);

const state = reactive<PasswordConfirmation>({
  password: "",
  passwordConfirmation: "",
});

const schema = object({
  password: string()
    .trim()
    .test(
      "is-valid-password",
      t("INVALID_PASSWORD"),
      (value: any) =>
        !value || (!!value && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(value))
    )
    .required(t("IS_REQUIRED", { text: t("NEW_", { text: " Password " }) })),
  passwordConfirmation: string()
    .trim()
    .test(
      "is-password-match",
      t("PASSWORD_NOT_MATCH"),
      (value: any) =>
        !!state.password && state.password === state.passwordConfirmation
    ),
});

const { error, status, reset } = await auth.resetPassword(token, state);

const toast = useIToast();
const onReset = async () => {
  await reset();
  if (error.value) {
    toast.onError(error.value.statusCode!, error.value.statusMessage!);
  }
  if (status.value === "success") {
    toast.onSuccess(
      t("RESET_PASSWORD_SUCCESS"),
      t("RESET_PASSWORD_SUCCESS_DETAIL")
    );
    setTimeout(() => {
      useRouter().push(localePath({ name: "login" }));
    }, 1000);
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <UForm :schema :state class="space-y-4" @submit="onReset">
      <UCard class="w-96 shadow-xl">
        <template #header>
          <p class="font-bold text-2xl">
            {{ modelName }}
          </p>
        </template>

        <div class="flex flex-col gap-y-5">
          <UFormGroup
            :label="$t('NEW_', { text: ' Password ' })"
            name="password"
          >
            <UInput
              v-model="state.password"
              type="password"
              :disabled="status === 'pending'"
              autocomplete="off"
            />
          </UFormGroup>
          <UFormGroup
            :label="$t('CONFIRM_PASSWORD')"
            name="passwordConfirmation"
          >
            <UInput
              v-model="state.passwordConfirmation"
              type="password"
              :disabled="status === 'pending'"
              autocomplete="off"
            />
          </UFormGroup>

          <UButton
            type="submit"
            block
            size="lg"
            :label="t('SAVE')"
            :disabled="status === 'pending'"
            :loading="status === 'pending'"
          />
        </div>
      </UCard>
    </UForm>
  </div>
</template>
