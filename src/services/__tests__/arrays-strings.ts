export const splitString = (value: string): string[] => {
  return value.split(' ');
};

export const splitStringAndJoin = (value: string): string => {
  return value.split(' ').join('.');
};

export const replaceString = (value: string): string => {
  return value.replace('math', 'gust');
};

export const charAt = (value: string): string => {
  return value.charAt(3);
};
