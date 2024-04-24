export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("lowercase", {
    mounted(el) {
      el.addEventListener("input", (e: Event) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.toLowerCase();
        target.dispatchEvent(new Event("input"));
      });
    },
  });
});
