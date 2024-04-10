export default defineAppConfig({
  ui: {
    primary: "indigo",
    button: {
      variant: { link: "hover:no-underline" },
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
