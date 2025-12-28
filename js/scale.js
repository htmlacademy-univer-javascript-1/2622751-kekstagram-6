const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

const getScaleElements = () => {
  const modal = document.querySelector('.img-upload__overlay');
  if (!modal) {
    console.warn('Модальное окно не найдено');
    return null;
  }
  
  return {
    modal,
    smallerButton: modal.querySelector('.scale__control--smaller'),
    biggerButton: modal.querySelector('.scale__control--bigger'),
    scaleInput: modal.querySelector('.scale__control--value'),
    image: modal.querySelector('.img-upload__preview img')
  };
};

const updateScale = (value) => {
  const elements = getScaleElements();
  if (!elements) return;
  
  const { scaleInput, image } = elements;
  
  if (image && image.src.includes('upload-default-image.jpg')) {
    console.log('Изображение не загружено, масштабирование не применяется');
    return;
  }
  
  currentScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, value));
  
  if (scaleInput) {
    scaleInput.value = `${currentScale}%`;
  }
  
  if (image) {
    image.style.transform = `scale(${currentScale / 100})`;
  }
};

const onSmallerClick = (evt) => {
  evt.preventDefault();
  updateScale(currentScale - SCALE_STEP);
};

const onBiggerClick = (evt) => {
  evt.preventDefault();
  updateScale(currentScale + SCALE_STEP);
};

const initScale = () => {
  const elements = getScaleElements();
  if (!elements) {
    console.warn('Элементы масштаба не найдены');
    return;
  }
  
  const { smallerButton, biggerButton, image } = elements;
  
  if (!smallerButton || !biggerButton || !image) {
    console.warn('Не все элементы масштаба найдены');
    return;
  }
  
  smallerButton.replaceWith(smallerButton.cloneNode(true));
  biggerButton.replaceWith(biggerButton.cloneNode(true));
  
  const newElements = getScaleElements();
  if (!newElements) return;
  
  const { smallerButton: newSmallerButton, biggerButton: newBiggerButton } = newElements;
  
  newSmallerButton.addEventListener('click', onSmallerClick);
  newBiggerButton.addEventListener('click', onBiggerClick);
  
  currentScale = DEFAULT_SCALE;
  updateScale(DEFAULT_SCALE);
  
  console.log('Масштаб инициализирован для пользовательского изображения');
};

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale(DEFAULT_SCALE);
};

export { initScale, resetScale };