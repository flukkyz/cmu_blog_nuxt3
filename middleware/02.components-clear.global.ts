export default defineNuxtRouteMiddleware(() => {
  breadcrumbs().clear();
  sidebar().drawer = false;
});
