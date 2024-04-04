<script setup lang="ts">
const body = reactive({
  username: "",
  password: "",
});

const invalid = ref<boolean>(false);
const noVerify = ref<boolean>(false);
const inactive = ref<boolean>(false);
const tempEmail = ref<string>("");

const clearInvalid = () => {
  invalid.value = false;
  noVerify.value = false;
  inactive.value = false;
};

const { error, status, refresh } = await await useIFetch("auth-member/login", {
  method: "POST",
  body,
  immediate: false,
  watch: false,
});

const onLogin = async () => {
  tempEmail.value = body.username;
  await refresh();
  if (error.value) {
    body.password = "";
    const statusCode = error.value.statusCode;
    [invalid.value, noVerify.value, inactive.value] = [
      statusCode === 401,
      statusCode === 403,
      statusCode === 405,
    ];
  }
};

const resendVerify = async () => {
  const { error } = await useIFetch("auth-member/resend-verify", {
    method: "POST",
    body: { email: tempEmail },
  });
  if (error.value) {
    console.log("error", error.value);
  }
  noVerify.value = false;
};
</script>

<template>
  <div class="flex justify-center items-center">
    <UCard>
      <template #header>
        <p class="font-bold">
          {{ $t("LOGIN") }}
        </p>
      </template>

      <UForm :state="body" class="space-y-4" @submit="onLogin">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="body.username"
            :disabled="status === 'pending'"
            @input="clearInvalid"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="body.password"
            type="password"
            :disabled="status === 'pending'"
            @input="clearInvalid"
          />
        </UFormGroup>

        <p v-if="invalid" class="text-red-500 text-center font-bold text-sm">
          {{ $t("INCORRECT", { text: " E-mail " + $t("OR") + " Password " }) }}
        </p>

        <p v-if="inactive" class="text-red-500 text-center font-bold text-sm">
          {{ $t("USER_INACTIVE") }}
        </p>

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
            @click="resendVerify"
          />
        </div>
        <UButton
          v-else
          type="submit"
          block
          size="lg"
          :label="$t('LOGIN')"
          :disabled="status === 'pending'"
          :loading="status === 'pending'"
        />
      </UForm>

      <template #footer>
        or
        <!-- <UButton :label="$t('LOGIN')" /> -->
      </template>
    </UCard>
  </div>
</template>
