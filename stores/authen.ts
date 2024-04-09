interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  avatar: string;
  password_created_at: string;
}
interface ListModel {
  user: User | null;
  loggedIn: boolean;
}

const endpoint = "auth-member";

export const authen = defineStore("authen", {
  state: () => {
    return {
      user: null,
      loggedIn: false,
    } as ListModel;
  },
  actions: {
    async login(body: Login) {
      const {
        error,
        data,
        status,
        execute: login,
      } = await useIFetch<Authentication>(`${endpoint}/login`, {
        method: "POST",
        body,
        immediate: false,
        watch: false,
      });

      const onLoggedIn = () => {
        if (data.value) {
          setToken(data.value.accessToken!, data.value.refreshToken!);
        }
      };
      watch(data, onLoggedIn);

      return {
        error,
        status,
        login,
      };
    },
    async callBack(code: string, state: string) {
      if (!this.loggedIn) {
        const { data, error } = await useIFetch<Authentication>(
          `${endpoint}/callback?code=${code}&state=${state}`
        );
        if (error.value) {
          throw createError({
            statusCode: error.value.statusCode,
            statusMessage: error.value.statusMessage,
            fatal: true,
          });
        }
        if (data.value) {
          setToken(data.value.accessToken!, data.value.refreshToken!);
        }
        await this.getUser();
      }
    },
    async getUser() {
      if (!this.loggedIn) {
        if (hasToken()) {
          await fetchApiUser();
          if (this.user) {
            this.loggedIn = true;
          }
        }
      }
    },
    async resendVerify(body: Email) {
      const { error, execute } = await useIFetch(`${endpoint}/resend-verify`, {
        method: "POST",
        body,
        immediate: false,
        watch: false,
      });
      return { error, execute };
    },
    async fetchUser() {
      if (this.loggedIn) {
        await fetchApiUser();
      }
    },
    async logout() {
      setToken(null, null);
      this.user = null;
      this.loggedIn = false;
      const { error, status } = await useIFetch(`${endpoint}/logout`, {
        method: "DELETE",
      });
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
        });
      }
      return { status };
    },
  },
});

const getToken = () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  return { accessToken, refreshToken };
};
const hasToken = (): boolean => {
  const { accessToken, refreshToken } = getToken();
  return !!accessToken.value && !!refreshToken.value;
};
const setToken = (
  newAccessToken: string | null,
  newRefreshToken: string | null
) => {
  const { accessToken, refreshToken } = getToken();
  accessToken.value = newAccessToken;
  refreshToken.value = newRefreshToken;
};

const fetchApiUser = async () => {
  const { error, data } = await useIFetch<User>(`${endpoint}/me`);
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage,
    });
  }
  if (data.value) {
    const auth = authen();
    auth.user = data.value;
  }
};
