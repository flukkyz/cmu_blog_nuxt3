export default (num: number, digitOptions: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat("th-th", digitOptions).format(num);
};
