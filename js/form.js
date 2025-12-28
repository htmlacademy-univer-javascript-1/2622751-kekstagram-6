import { initFormValidation } from './validate.js';

let pristine = null;

const closeForm = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const fileInput = document.querySelector('#upload-file');
  
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
  
  if (!overlay || !fileInput) {
    return;
  }
  
  if (fileInput.files[0]) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
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
  
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const isValid = pristine.validate();
    
    if (isValid) {
      form.submit();
    }
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