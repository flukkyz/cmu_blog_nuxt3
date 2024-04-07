export default defineNuxtRouteMiddleware(() => {
  if (authen().loggedIn) {
    abortNavigation();
    return navigateTo(useLocalePath()({ name: "index" }));
  }
});
