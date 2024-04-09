interface MenuModel {
  frontend: NavigationLinkItem[][];
  backend: NavigationLinkItem[][];
  profile: NavigationLinkItem[][];
  guest: NavigationLinkItem[];
}

const localePath = useLocalePath();

export const menus = defineStore("menus", {
  state: () => {
    return {
      frontend: [
        [
          {
            label: "Blog",
            icon: "i-fa6-solid-blog",
            to: localePath({ name: "blogs" }),
          },
          {
            label: "CRUD",
            icon: "i-fa6-solid-cube",
            to: localePath({ name: "cruds" }),
          },
          {
            label: "About",
            icon: "i-fa6-solid-cube",
            to: localePath({ name: "about" }),
          },
        ],
      ],
      backend: [],
      profile: [
        [
          {
            label: "Profile",
            icon: "i-fa6-solid-user-pen",
            to: localePath({ name: "profile" }),
          },
        ],
        [
          {
            label: useT("LOGOUT"),
            icon: "i-fa6-solid-right-from-bracket",
            to: localePath({ name: "logout" }),
          },
        ],
      ],
      guest: [
        {
          label: useT("LOGIN"),
          icon: "i-fa6-solid-right-to-bracket",
          to: localePath({ name: "login" }),
        },
        {
          label: useT("SIGNUP"),
          icon: "i-fa6-solid-user-plus",
          to: localePath({ name: "register" }),
        },
      ],
    } as MenuModel;
  },
});
