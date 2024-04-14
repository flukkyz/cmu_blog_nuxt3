export default () => {
  const { t } = useI18n();
  const localePath = useLocalePath();
  return {
    rowsPerPages: [
      { value: 10, label: 10 },
      { value: 20, label: 20 },
      { value: 30, label: 30 },
      { value: 50, label: 50 },
      { value: 100, label: 100 },
      { value: -1, label: t("ALL") },
    ],
    menus: {
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
            label: t("ABOUT"),
            icon: "i-fa6-solid-circle-info",
            to: localePath({ name: "about" }),
          },
        ],
      ],
      backend: [],
      profile: [
        [
          {
            label: t("PROFILE"),
            icon: "i-fa6-solid-user-pen",
            to: localePath({ name: "profile" }),
          },
        ],
        [
          {
            label: t("LOGOUT"),
            icon: "i-fa6-solid-right-from-bracket",
            to: localePath({ name: "logout" }),
          },
        ],
      ],
      guest: [
        {
          label: t("LOGIN"),
          icon: "i-fa6-solid-right-to-bracket",
          to: localePath({ name: "login" }),
        },
        {
          label: t("SIGNUP"),
          icon: "i-fa6-solid-user-plus",
          to: localePath({ name: "register" }),
        },
      ],
    },
  };
};
