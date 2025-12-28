// api.js
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Не удалось загрузить фотографии: ${error.message}`);
  }
};

const sendData = async (formData) => {
  try {
    console.log('Отправка запроса на:', BASE_URL);
    
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    
    console.log('Статус ответа:', response.status, response.statusText);
    
    if (!response.ok) {
      let errorMessage = `Ошибка сервера: ${response.status}`;
      
      try {
        const errorText = await response.text();
        console.log('Текст ошибки:', errorText);
        errorMessage += ` - ${errorText}`;
      } catch {
      }
      
      throw new Error(errorMessage);
    }
    
    try {
      const result = await response.json();
      console.log('Успешный ответ:', result);
      return result;
    } catch {
      const text = await response.text();
      console.log('Текстовый ответ:', text);
      return text;
    }
    
  } catch (error) {
    console.error('Ошибка отправки:', error);
    throw new Error(`Не удалось отправить фотографию: ${error.message}`);
  }
};

export { getData, sendData };