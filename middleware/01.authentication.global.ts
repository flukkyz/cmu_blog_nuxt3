export default defineNuxtRouteMiddleware(async () => {
  await authen().getUser();
});
