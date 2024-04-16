export default (num: number, digitOptions: Intl.NumberFormatOptions = {}) => {
  const { locale, locales } = useI18n();
  return new Intl.NumberFormat(
    useFind(locales.value, { code: locale.value })!.iso,
    digitOptions
  ).format(num);
};
