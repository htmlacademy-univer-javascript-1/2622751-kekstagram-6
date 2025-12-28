// Функция показа сообщения об ошибке
export const showAlert = (message, duration = 5000) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff4d4d;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: alertFadeIn 0.3s ease-in-out;
  `;
  alertContainer.textContent = message;
  
  document.body.appendChild(alertContainer);
  
  if (!document.querySelector('#alert-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'alert-animation-styles';
    style.textContent = `
      @keyframes alertFadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes alertFadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => {
    alertContainer.style.animation = 'alertFadeOut 0.3s ease-in-out';
    setTimeout(() => alertContainer.remove(), 300);
  }, duration);
  
  return alertContainer;
};

// Функция показа сообщения об успехе
export const showSuccessMessage = (message, duration = 5000) => {
  const successContainer = document.createElement('div');
  successContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: alertFadeIn 0.3s ease-in-out;
  `;
  successContainer.textContent = message;
  
  document.body.appendChild(successContainer);
  
  setTimeout(() => {
    successContainer.style.animation = 'alertFadeOut 0.3s ease-in-out';
    setTimeout(() => successContainer.remove(), 300);
  }, duration);
  
  return successContainer;
};

// Функция блокировки/разблокировки кнопки отправки
export const toggleSubmitButton = (isDisabled) => {
  const submitButton = document.querySelector('.img-upload__submit');
  if (submitButton) {
    submitButton.disabled = isDisabled;
    submitButton.textContent = isDisabled ? 'Отправка...' : 'Опубликовать';
    submitButton.style.opacity = isDisabled ? '0.7' : '1';
    submitButton.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
  }
};

// Функция проверки типа файла
export const isValidFileType = (file) => {
  const validMimeTypes = [
    'image/jpeg', 
    'image/jpg', 
    'image/png', 
    'image/gif', 
    'image/webp'
  ];
  
  const isMimeValid = validMimeTypes.includes(file.type);
  
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const isExtensionValid = validExtensions.some(ext => fileName.endsWith(ext));
  
  return isMimeValid || isExtensionValid;
};

// Функция проверки размера файла
export const isValidFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// Функция для получения случайного элемента из массива
export const getRandomElement = (array) => {
  if (!array || array.length === 0) {
    return null;
  }
  return array[Math.floor(Math.random() * array.length)];
};

// Функция для получения случайного числа в диапазоне
export const getRandomNumber = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для проверки длины строки
export const checkStringLength = (string, maxLength) => {
  return string.length <= maxLength;
};

// Функция для проверки на палиндром
export const checkPalindrome = (string) => {
  const cleanedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  
  for (let i = cleanedString.length - 1; i >= 0; i--) {
    reversedString += cleanedString.at(i);
  }
  
  return reversedString === cleanedString;
};

// Функция для извлечения чисел из строки
export const extractNumbers = (string) => {
  let numbersString = '';
  
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    
    if (!Number.isNaN(number) && number >= 0 && number <= 9) {
      numbersString += number;
    }
  }
  
  if (numbersString === '') {
    return NaN;
  }
  
  return parseInt(numbersString, 10);
};

// Функция debounce для устранения дребезга
export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция throttle для пропуска кадров
export const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  
  return (...rest) => {
    const now = new Date();
    
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

// Функция для создания сообщения из шаблона
export const createMessageFromTemplate = (templateId, onCloseCallback = null) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    console.error(`Шаблон ${templateId} не найден`);
    return null;
  }
  
  const messageElement = template.content.cloneNode(true);
  const messageSection = messageElement.querySelector(`.${templateId}`);
  const closeButton = messageSection.querySelector('button');
  
  document.body.appendChild(messageSection);
  
  const closeMessage = () => {
    messageSection.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
    if (onCloseCallback) {
      onCloseCallback();
    }
  };
  
  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };
  
  const onOutsideClick = (evt) => {
    if (!evt.target.closest(`.${templateId}__inner`)) {
      closeMessage();
    }
  };
  
  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
  
  return messageSection;
};

// Функция для проверки, является ли элемент видимым в области просмотра
export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Функция для форматирования чисел (например, 1000 -> 1K)
export const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
};

// Функция для эвакуации фокуса (убирает фокус с текущего элемента)
export const escapeFocus = () => {
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
};

// Функция для проверки поддержки формата файла
export const isFileFormatSupported = (file) => {
  const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return supportedFormats.includes(file.type);
};

// Функция для создания уникального ID
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Функция для глубокого клонирования объекта
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Функция для устранения XSS-атак (базовая очистка)
export const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Функция для формата даты
export const formatDate = (date, format = 'dd.mm.yyyy') => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('dd', day)
    .replace('mm', month)
    .replace('yyyy', year);
};

// Функция для задержки (sleep)
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Экспорт всех функций
export default {
  showAlert,
  showSuccessMessage,
  toggleSubmitButton,
  isValidFileType,
  isValidFileSize,
  getRandomElement,
  getRandomNumber,
  checkStringLength,
  checkPalindrome,
  extractNumbers,
  debounce,
  throttle,
  createMessageFromTemplate,
  isElementInViewport,
  formatNumber,
  escapeFocus,
  isFileFormatSupported,
  generateUniqueId,
  deepClone,
  sanitizeInput,
  formatDate,
  sleep
};