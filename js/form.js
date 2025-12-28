import { initFormValidation } from './validate.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effects.js';
import { sendData } from './api.js'; 
import { showAlert, showSuccessMessage, toggleSubmitButton, isValidFileType } from './util.js';

let pristine = null;

const resetForm = () => {
  const form = document.querySelector('.img-upload__form');
  const fileInput = document.querySelector('#upload-file');
  
  if (form) {
    form.reset();
  }
  
  if (fileInput) {
    fileInput.value = '';
  }
  
  if (pristine) {
    pristine.reset();
  }
  
  resetScale();
  resetEffect();
  
  const previewImage = document.querySelector('.img-upload__preview img');
  if (previewImage) {
    previewImage.src = 'img/upload-default-image.jpg';
    previewImage.style.transform = 'scale(1)';
    previewImage.style.filter = 'none';
    previewImage.className = '';
  }
};

const closeForm = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  
  if (!overlay) {
    return;
  }
  
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  
  resetForm();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
};

const openForm = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  const fileInput = document.querySelector('#upload-file');
  const previewImage = document.querySelector('.img-upload__preview img');
  
  if (!overlay || !fileInput || !previewImage) {
    return;
  }
  
  const file = fileInput.files[0];
  if (!file) {
    return;
  }
  
  if (!isValidFileType(file)) {
    showAlert('Пожалуйста, выберите изображение в формате JPEG, PNG, GIF или WebP');
    fileInput.value = '';
    return;
  }
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024; 
  if (file.size > MAX_FILE_SIZE) {
    showAlert('Файл слишком большой. Максимальный размер: 5MB');
    fileInput.value = '';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
  
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  
  setTimeout(() => {
    initScale();
    initEffect();
  }, 50);
};

const submitForm = async (formData) => {
  try {
    toggleSubmitButton(true);
    
    await sendData(formData);
    
    closeForm();
    showSuccessMessage('Ваша фотография успешно опубликована!');
    
    console.log('Фотография успешно отправлена на сервер');
    
  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    showAlert(error.message || 'Не удалось отправить фотографию');
    
  } finally {
    toggleSubmitButton(false);
  }
};

const initForm = () => {
  const fileInput = document.querySelector('#upload-file');
  const overlay = document.querySelector('.img-upload__overlay');
  const cancelButton = document.querySelector('#upload-cancel');
  const form = document.querySelector('.img-upload__form');
  
  if (!fileInput || !overlay || !form) {
    console.error('Не найдены элементы формы');
    return;
  }
  
  pristine = initFormValidation(form);
  if (!pristine) {
    console.error('Не удалось инициализировать валидацию');
  }
  
  fileInput.addEventListener('change', openForm);
  
  if (cancelButton) {
    cancelButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeForm();
    });
  }
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    
    const isValid = pristine.validate();
    if (!isValid) {
      showAlert('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    
    const formData = new FormData(form);
    
    const imageFile = fileInput.files[0];
    if (imageFile) {
      formData.append('filename', imageFile);
    }
    
    await submitForm(formData);
  });
  
  const hashtagsInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');
  
  const stopEscPropagation = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };
  
  if (hashtagsInput) {
    hashtagsInput.addEventListener('keydown', stopEscPropagation);
  }
  
  if (commentInput) {
    commentInput.addEventListener('keydown', stopEscPropagation);
  }
  
  console.log('Форма загрузки инициализирована');
};

export { initForm };