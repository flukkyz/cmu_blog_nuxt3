import type { UseFetchOptions } from "#app";

export const useIFetch = <T>(
  endpoint: string,
  options: UseFetchOptions<T> = {}
) => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.apiBase}${config.public.apiPath}`;
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");

  const defaults: UseFetchOptions<T> = {
    baseURL,
    retryStatusCodes: [401],
    retry: 1,
    headers: accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {},
    onResponseError: async ({ response, options }) => {
      if (response.status === 401 && refreshToken.value) {
        try {
          const data = await $fetch<Authentication>("auth-member/token", {
            baseURL,
            method: "POST",
            body: { refreshToken: refreshToken.value },
          });
          const newToken = data.accessToken;
          accessToken.value = data.accessToken;
          options.headers = { Authorization: `Bearer ${newToken}` };
        } catch (error) {
          return error;
        }
      }
    },
  };

  const params = useMerge(options, defaults);

  return useFetch(endpoint, params);
};
