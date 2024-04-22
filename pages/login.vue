<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const auth = authen();
const router = useRouter();
const modelName = t("LOGIN");

definePageMeta({
  layout: "blank",
  middleware: "guest",
});
useHead({
  title: modelName,
});
breadcrumbs().clear();

const body = reactive({
  username: "",
  password: "",
});

const invalid = ref<boolean>(false);
const noVerify = ref<boolean>(false);
const inactive = ref<boolean>(false);

const config = useRuntimeConfig();
const apiPath = `${config.public.apiBase}${config.public.apiPath}`;

const clearInvalid = () => {
  invalid.value = false;
  noVerify.value = false;
  inactive.value = false;
};

const { error, status, login } = await auth.login(body);

const onLogin = async () => {
  resendVerifyEmail.email = body.username;
  await login();
  if (error.value) {
    body.password = "";
    const statusCode = error.value.statusCode;
    [invalid.value, noVerify.value, inactive.value] = [
      statusCode === 401,
      statusCode === 403,
      statusCode === 405,
    ];
  }
  if (status.value === "success") {
    router.push(localePath({ name: "index" }));
  }
};

const toast = useToast();
const resendVerifyEmail = reactive({
  email: "",
});
const resendVerify = await auth.resendVerify(resendVerifyEmail);
const onResendVerify = async () => {
  await resendVerify.execute();
  if (error.value) {
    toast.add({
      title: error.value.statusCode?.toString(),
      description: error.value.statusMessage,
    });
  }
  noVerify.value = false;
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <UForm :state="body" class="space-y-4" @submit="onLogin">
      <UCard class="min-w-80 shadow-xl">
        <template #header>
          <p class="font-bold text-2xl">
            {{ modelName }}
          </p>
        </template>

        <div class="flex flex-col gap-y-5">
          <UFormGroup label="Email" name="username">
            <UInput
              v-model="body.username"
              :disabled="status === 'pending'"
              autocomplete="off"
              autofocus
              @input="clearInvalid"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="body.password"
              type="password"
              :disabled="status === 'pending'"
              autocomplete="off"
              @input="clearInvalid"
            />
          </UFormGroup>

          <p v-if="invalid" class="text-red-500 text-center font-bold text-sm">
            {{
              $t("INCORRECT", { text: " E-mail " + $t("OR") + " Password " })
            }}
          </p>

          <p v-if="inactive" class="text-red-500 text-center font-bold text-sm">
            {{ $t("USER_INACTIVE") }}
          </p>
        </div>

        <template #footer>
          <div v-if="noVerify" class="text-center">
            <p class="text-red-500 text-center font-bold text-xs">
              {{ $t("EMAIL_HAS_NOT_BEEN_VERIFIED") }}
            </p>
            <p class="text-xs text-gray-400">
              {{ $t("IF_HAVE_NOT_RECEIVED_EMAIL") }}
            </p>
            <UButton
              size="sm"
              color="blue"
              :label="$t('SEND_EMAIL_AGAIN')"
              @click="onResendVerify"
            />
          </div>
          <div v-else class="flex flex-col gap-y-5">
            <UButton
              type="submit"
              block
              size="lg"
              :label="modelName"
              :disabled="
                status === 'pending' || !body.username || !body.password
              "
              :loading="status === 'pending'"
            />
            <UDivider :label="$t('OR')" />
            <UButton
              :label="$t('LOGIN_WITH', { text: 'CMU OAuth' })"
              :to="`${apiPath}auth-member/oauth/cmu`"
              size="lg"
              color="purple"
              class="justify-center"
            >
              <template #leading>
                <NuxtImg src="/images/cmu_logo.png" height="30" />
              </template>
            </UButton>
            <UButton
              :label="$t('LOGIN_WITH', { text: 'CMU Microsoft 365' })"
              :to="`${apiPath}auth-member/oauth/m365`"
              size="lg"
              color="blue"
              class="justify-center"
            >
              <template #leading>
                <NuxtImg src="/images/cmu_logo_2.png" height="30" />
              </template>
            </UButton>
            <UButton
              :label="$t('LOGIN_WITH', { text: 'Google' })"
              :to="`${apiPath}auth-member/oauth/google`"
              size="lg"
              color="red"
              icon="i-fa6-brands-google"
              class="justify-center"
            />
          </div>
        </template>
      </UCard>
    </UForm>
  </div>
</template>
