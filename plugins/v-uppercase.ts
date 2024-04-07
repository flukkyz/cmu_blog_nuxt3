export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("uppercase", {
    mounted(el) {
      el.addEventListener("input", (e: Event) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.toUpperCase();
        target.dispatchEvent(new Event("input"));
      });
    },
  });
});
