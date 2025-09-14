export const convertDateStringToIsoDate = (date: string): string => {
  if (date.split('/')[0].length == 4) return date;

  return date.split('/').reverse().join('/');
};
