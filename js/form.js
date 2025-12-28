import { initFormValidation } from './validate.js';
import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effects.js';
import { sendData } from './api.js';
import { 
  showAlert, 
  showSuccessMessage, 
  toggleSubmitButton, 
  isValidFileType, 
  isValidFileSize,
  createMessageFromTemplate 
} from './util.js';

let pristine = null;
let currentFile = null;

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
  
  const effectPreviews = document.querySelectorAll('.effects__preview');
  effectPreviews.forEach(preview => {
    preview.style.backgroundImage = 'none';
  });
  
  currentFile = null;
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

const updateEffectPreviews = (imageUrl) => {
  const effectPreviews = document.querySelectorAll('.effects__preview');
  effectPreviews.forEach(preview => {
    preview.style.backgroundImage = `url(${imageUrl})`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
  });
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
  
  currentFile = file;
  
  if (!isValidFileType(file)) {
    showAlert('Пожалуйста, выберите изображение в формате JPEG, PNG, GIF или WebP');
    fileInput.value = '';
    currentFile = null;
    return;
  }
  
  const MAX_FILE_SIZE_MB = 5;
  if (!isValidFileSize(file, MAX_FILE_SIZE_MB)) {
    showAlert(`Файл слишком большой. Максимальный размер: ${MAX_FILE_SIZE_MB}MB`);
    fileInput.value = '';
    currentFile = null;
    return;
  }
  
  const imageUrl = URL.createObjectURL(file);
  
  previewImage.src = imageUrl;
  previewImage.onload = () => {
    URL.revokeObjectURL(imageUrl);
  };
  
  updateEffectPreviews(imageUrl);
  
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  
  setTimeout(() => {
    initScale();
    initEffect();
  }, 100);
};

const submitForm = async () => {
  try {
    toggleSubmitButton(true);
    
    const form = document.querySelector('.img-upload__form');
    
    const cleanFormData = new FormData();
    
    if (currentFile) {
      cleanFormData.append('filename', currentFile);
    }
    
    const hashtagsInput = form.querySelector('.text__hashtags');
    if (hashtagsInput && hashtagsInput.value.trim() !== '') {
      cleanFormData.append('hashtags', hashtagsInput.value.trim());
    }
    
    const descriptionInput = form.querySelector('.text__description');
    if (descriptionInput && descriptionInput.value.trim() !== '') {
      cleanFormData.append('description', descriptionInput.value.trim());
    }
    
    const scaleInput = document.querySelector('.scale__control--value');
    if (scaleInput) {
      const scaleValue = scaleInput.value.replace('%', '');
      cleanFormData.append('scale', scaleValue);
    }
    
    const effectRadio = document.querySelector('input[name="effect"]:checked');
    if (effectRadio) {
      cleanFormData.append('effect', effectRadio.value);
    }
    
    const effectLevelValue = document.querySelector('.effect-level__value');
    if (effectLevelValue && effectLevelValue.value && effectLevelValue.value !== '') {
      cleanFormData.append('effect-level', effectLevelValue.value);
    }
    
    console.log('Отправляемые данные:');
    for (let [key, value] of cleanFormData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, `Файл - ${value.name}`);
      } else {
        console.log(`${key}:`, `"${value}"`);
      }
    }
    
    const response = await sendData(cleanFormData);
    
    closeForm();
    
    createMessageFromTemplate('success');
    showSuccessMessage('Ваша фотография успешно опубликована!');
    
  } catch (error) {
    createMessageFromTemplate('error', () => {
      toggleSubmitButton(false);
    });
    
    showAlert(error.message);
    
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
    return;
  }
  
  pristine = initFormValidation(form);
  
  fileInput.addEventListener('change', openForm);
  
  if (cancelButton) {
    cancelButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      closeForm();
    });
  }
  
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    
    if (!currentFile) {
      showAlert('Пожалуйста, выберите фотографию');
      return;
    }
    
    const isValid = pristine.validate();
    if (!isValid) {
      showAlert('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    
    await submitForm();
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
};

export { initForm };