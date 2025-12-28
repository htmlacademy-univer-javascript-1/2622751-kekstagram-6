const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ').filter(tag => tag !== '');
  
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  
  const seen = new Set();
  
  for (const hashtag of hashtags) {
    const lowerCaseTag = hashtag.toLowerCase();
    
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }
    
    if (seen.has(lowerCaseTag)) {
      return false;
    }
    seen.add(lowerCaseTag);
  }
  
  return true;
};

const validateComment = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};

const initFormValidation = (formElement) => {
  const hashtagsInput = formElement.querySelector('.text__hashtags');
  const commentInput = formElement.querySelector('.text__description');
  
  if (!hashtagsInput || !commentInput) {
    return null;
  }
  
  const pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });
  
  pristine.addValidator(
    hashtagsInput,
    validateHashtags,
    `Максимум ${MAX_HASHTAGS} хэш-тегов. Каждый хэш-тег должен начинаться с #, содержать только буквы и цифры (1-19 символов). Дублирование не допускается.`,
    2,
    false
  );
  
  pristine.addValidator(
    commentInput,
    validateComment,
    `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`,
    2,
    false
  );
  
  return pristine;
};

export { initFormValidation };