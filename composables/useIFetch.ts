import type { UseFetchOptions } from "#app";

export const useIFetch = <T>(
  endpoint: string,
  options: UseFetchOptions<T> = {}
) => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.apiBase}${config.public.apiPath}`;
  const accessToken = useCookie("accessToken");

  const defaults: UseFetchOptions<T> = {
    baseURL,
    // key: endpoint,
    headers: accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {},
    onResponse: async ({ response, options }) => {
      if (response.status === 401 && !options.retry) {
        (options.retry as boolean) = true;

        const refreshToken = useCookie("refreshToken");
        if (refreshToken.value) {
          const { data, error } = await useFetch<{
            accessToken: string;
          }>(`${baseURL}auth-member/token`, {
            method: "POST",
            body: { refreshToken: refreshToken.value },
          });

          if (error.value) {
            throw createError({
              statusCode: error.value.statusCode,
              statusMessage: error.value.statusMessage,
            });
          }

          if (data.value) {
            const newToken = data.value?.accessToken;
            accessToken.value = newToken;

            options.headers = { Authorization: `Bearer ${newToken}` };
            useFetch(endpoint, options as UseFetchOptions<T>);
          }
        }
      }
    },
  };

  const params = useMerge(options, defaults);

  return useFetch(endpoint, params);
};
