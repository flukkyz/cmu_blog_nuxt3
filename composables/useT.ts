export default (key: string): string => {
  return useNuxtApp().$i18n.t(key);
};
