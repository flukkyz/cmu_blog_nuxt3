// import { logout, me } from '@/services/auth.services'
interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  avatar: string;
  password_created_at: string;
}

export interface Login {
  username: string;
  password: string;
}

interface ListModel {
  user?: User;
  loggedIn: boolean;
}
interface ListModel {
  user?: User;
  loggedIn: boolean;
}

interface Authentication {
  accessToken?: string;
  refreshToken?: string;
}

export const authen = defineStore("authen", {
  state: () => {
    return {
      loggedIn: false,
    } as ListModel;
  },
  actions: {
    async login(body: Login) {
      const {
        error,
        data,
        status,
        refresh: login,
      } = await useIFetch<Authentication>("auth-member/login", {
        method: "POST",
        body,
        immediate: false,
        watch: false,
      });

      const onLoggedIn = () => {
        if (data.value) {
          const accessToken = useCookie("accessToken");
          const refreshToken = useCookie("refreshToken");
          accessToken.value = data.value.accessToken;
          refreshToken.value = data.value.refreshToken;
        }
      };
      watch(data, onLoggedIn);

      return {
        error,
        status,
        login,
      };
    },
    async getUser() {
      if (!this.loggedIn) {
        const accessToken = useCookie("accessToken");
        const refreshToken = useCookie("refreshToken");
        if (accessToken.value && refreshToken.value) {
          await fetchApiUser();
          if (this.user) {
            this.loggedIn = true;
          }
        }
      }
    },
    async fetchUser() {
      if (this.loggedIn) {
        await fetchApiUser();
      }
    },
    async logout() {
      const accessToken = useCookie("accessToken");
      const refreshToken = useCookie("refreshToken");
      accessToken.value = null;
      refreshToken.value = null;
      this.user = undefined;
      this.loggedIn = false;
      const { error, status } = await useIFetch("auth-member/logout", {
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

const fetchApiUser = async () => {
  const { error, data } = await useIFetch<User>("auth-member/me");
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
