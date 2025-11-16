function checkLength(string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrom(string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let stringPalinndrom = '';

  for (let i = newString.length - 1; i >= 0; i--) {
    stringPalinndrom += newString.at(i);
  }

  if (stringPalinndrom === newString) {
    return true;
  }
  return false;
}

function getNumber(string) {
  let newString = '';

  for (let i = 0; i < string.length; i++) {
    const numbers = parseInt(string[i], 10);

    if (!Number.isNaN(numbers) && numbers >= 0 && numbers <= 9) {
      newString += numbers;
    }
  }

  if (newString === '') {
    return NaN;
  }

  return parseInt(newString, 10);
}

checkLength('тест', 10);
checkPalindrom('топот');
getNumber('2023 год');