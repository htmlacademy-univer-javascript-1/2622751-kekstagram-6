const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',     
  SEND_DATA: '',         
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить фотографии. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить фотографию. Попробуйте ещё раз',
};

const TIMEOUT = 10000;

const request = async (url, method = Method.GET, body = null) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      method,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Запрос превысил время ожидания');
    }
    
    throw error;
  }
};

const getData = async () => {
  try {
    const data = await request(`${BASE_URL}${Route.GET_DATA}`);
    
    if (!Array.isArray(data)) {
      throw new Error('Получены некорректные данные с сервера');
    }
    
    return data;
  } catch (error) {
    throw new Error(ErrorText.GET_DATA);
  }
};

const sendData = async (formData) => {
  try {
    const response = await request(BASE_URL, Method.POST, formData);
    return response;
  } catch (error) {
    throw new Error(ErrorText.SEND_DATA);
  }
};

export { getData, sendData };