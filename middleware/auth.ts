export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = authen();
  const localePath = useLocalePath();
  await auth.getUser();

  if (!auth.loggedIn) {
    abortNavigation();
    return navigateTo(localePath({ name: "login" }));
  }
});
