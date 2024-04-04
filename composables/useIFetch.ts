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
    key: endpoint,
    headers: accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {},
    onResponse: async ({ response, options }) => {
      if (response.status === 401 && !options.retry) {
        try {
          (options.retry as boolean) = true;

          const refreshToken = useCookie("refreshToken");
          if (refreshToken.value) {
            const { data, status } = await useFetch<{ accessToken: string }>(
              `${baseURL}auth-member/token`,
              {
                method: "POST",
                body: { refresh_token: refreshToken.value },
              }
            );

            if (status.value === "success") {
              const newToken = data.value?.accessToken;
              accessToken.value = newToken;

              options.headers = { Authorization: `Bearer ${newToken}` };
              useFetch(endpoint, options as UseFetchOptions<T>);
            } else {
              // throw new Error("Token refresh failed");
              console.error("Token refresh failed");
            }
          }
          console.error("No refresh token");
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }
    },
  };

  const params = useMerge(options, defaults);

  return useFetch(endpoint, params);
};
