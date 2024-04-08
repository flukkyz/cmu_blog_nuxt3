interface MenuModel {
  frontend: NavigationLinkItem[][];
  backend: NavigationLinkItem[][];
  profile: NavigationLinkItem[];
}

const localePath = useLocalePath();

export const menus = defineStore("menus", {
  state: () => {
    return {
      frontend: [
        [
          {
            label: "Blog",
            icon: "i-mdi-post",
            to: localePath({ name: "blogs" }),
          },
          {
            label: "CRUD",
            icon: "i-fa6-solid-cube",
            to: localePath({ name: "cruds" }),
          },
        ],
      ],
      backend: [],
      profile: [
        {
          label: "Profile",
          icon: "i-fa6-solid-user",
          to: localePath({ name: "profile" }),
        },
      ],
    } as MenuModel;
  },
});
