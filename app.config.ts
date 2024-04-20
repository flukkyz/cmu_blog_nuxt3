export default defineAppConfig({
  ui: {
    primary: "indigo",
    button: {
      variant: { link: "hover:no-underline" },
    },
    input: {
      icon: {
        leading: {
          pointer: "",
        },
        trailing: {
          pointer: "",
        },
      },
    },
    icons: {
      dynamic: true,
    },
    tooltip: {
      popper: {
        placement: "top",
      },
    },
  },
});
