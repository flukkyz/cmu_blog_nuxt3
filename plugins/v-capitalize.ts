export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("capitalize", {
    mounted(el) {
      el.addEventListener("input", (e: Event) => {
        const target = e.target as HTMLInputElement;
        target.value = useCapitalize(target.value);
        target.dispatchEvent(new Event("input"));
      });
    },
  });
});
