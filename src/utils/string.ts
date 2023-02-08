export const capitalToDash = (value: string): string => {
  return value.match(/[A-Z]/g)?.length
    ? value.replace(/[A-Z]/g, str => `-${str.toLowerCase()}`)
    : value;
};
