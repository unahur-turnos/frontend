import removeDiacritics from 'diacritics';

export const parserStringToLowerCase = (string) => {
  return removeDiacritics.remove(string.toLowerCase());
};
