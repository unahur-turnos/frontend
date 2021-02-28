import removeDiacritics from 'diacritics';

export const toLowerWithoutDiacritics = (string) => {
  return removeDiacritics.remove(string.toLowerCase());
};
