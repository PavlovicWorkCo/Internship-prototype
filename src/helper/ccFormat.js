export function ccFormat(value) {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  }
  return value;
}

export function formatCCExpirationDate(value) {
  const onlyNumbers = value.replace(/\D/g, '');
  const matches = onlyNumbers.match(/\d{2,4}/g);
  const matchingString = (matches && matches[0]) || '';
  const dateParts = [];
  for (let i = 0, len = matchingString.length; i < len; i += 2) {
    dateParts.push(matchingString.substring(i, i + 2));
  }
  if (dateParts.length) {
    return dateParts.join('/');
  }
  if (!onlyNumbers) return '';
  return onlyNumbers;
}
