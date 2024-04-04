// import { logout, me } from '@/services/auth.services'
interface User {
  email: string;
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

const accessToken = useCookie("accessToken");
const refreshToken = useCookie("refreshToken");

export const authen = defineStore("authen", {
  state: () => {
    return {
      loggedIn: false,
    } as ListModel;
  },
  actions: {
    async login(authentication: Authentication) {
      accessToken.value = authentication.accessToken;
      refreshToken.value = authentication.refreshToken;
    },
    // async getUser() {
    //   if (!this.loggedIn) {
    //     if (accessToken.value && refreshToken.value) {
    //       await fetchApiUser();
    //       if (this.user) {
    //         this.loggedIn = true;
    //       }
    //     }
    //   }
    // },
    // async fetchUser() {
    //   if (this.loggedIn) {
    //     await fetchApiUser();
    //   }
    // },
    // async logout() {
    //   await onLogout();
    // },
    clear() {
      cleanData();
    },
  },
});

// const fetchApiUser = async () => {
//   const auth = authStore();
//   try {
//     const userData = await me();
//     auth.user = userData.data;
//   } catch (e) {
//     console.log(e);
//   }
// };
// const onLogout = async () => {
//   try {
//     await logout();
//     cleanData();
//   } catch (e) {
//     console.log(e);
//   }
// };
const cleanData = async () => {
  const auth = authen();
  accessToken.value = null;
  refreshToken.value = null;
  auth.user = undefined;
  auth.loggedIn = false;
};
