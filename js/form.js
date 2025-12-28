// form.js
import { initFormValidation } from './validate.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effects.js';

let pristine = null;

const closeForm = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const fileInput = document.querySelector('#upload-file');
  
  console.log('Закрытие формы');
  
  if (!overlay) {
    return;
  }
  
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  
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
  
  console.log('Открытие формы загрузки изображения');
  
  if (!overlay || !fileInput) {
    console.error('Не найдены элементы формы');
    return;
  }
  
  if (fileInput.files[0]) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    
    console.log('Форма открыта, начинаем инициализацию компонентов');
    
    // Даем время на отрисовку DOM
    setTimeout(() => {
      console.log('--- Инициализация масштаба ---');
      initScale();
      
      console.log('--- Инициализация эффектов ---');
      initEffect();
      
      // Проверяем наличие слайдера
      const sliderContainer = overlay.querySelector('.effect-level');
      const sliderElement = overlay.querySelector('.effect-level__slider');
      console.log('Проверка слайдера:', {
        sliderContainerExists: !!sliderContainer,
        sliderElementExists: !!sliderElement,
        sliderHasNoUiSlider: sliderElement ? !!sliderElement.noUiSlider : false
      });
    }, 50);
  }
};

const initForm = () => {
  const fileInput = document.querySelector('#upload-file');
  const overlay = document.querySelector('.img-upload__overlay');
  const cancelButton = document.querySelector('#upload-cancel');
  const form = document.querySelector('.img-upload__form');
  
  console.log('=== Инициализация формы загрузки ===');
  console.log('Найденные элементы:', {
    fileInput: !!fileInput,
    overlay: !!overlay,
    cancelButton: !!cancelButton,
    form: !!form
  });
  
  if (!fileInput || !overlay || !form) {
    console.error('Не найдены необходимые элементы формы');
    return;
  }
  
  pristine = initFormValidation(form);
  if (!pristine) {
    console.error('Не удалось инициализировать валидацию');
  } else {
    console.log('Валидация инициализирована');
  }
  
  fileInput.addEventListener('change', openForm);
  
  if (cancelButton) {
    cancelButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeForm();
    });
  }
  
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log('Попытка отправки формы');
    
    const isValid = pristine.validate();
    console.log('Результат валидации:', isValid);
    
    if (isValid) {
      console.log('Форма валидна');
      // form.submit();
    }
  });
  
  // Обработчики для предотвращения закрытия при фокусе
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