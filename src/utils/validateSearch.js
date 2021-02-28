import { includes } from 'ramda';
import { toLowerWithoutDiacritics } from './toLowerWithoutDiacritics';

export function validateSearch(textToSearch, text) {
  return includes(
    toLowerWithoutDiacritics(textToSearch),
    toLowerWithoutDiacritics(text)
  );
}
