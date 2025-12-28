const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;
let scaleControlSmaller = null;
let scaleControlBigger = null;
let scaleControlValue = null;
let imageElement = null;

const updateScale = () => {
  if (scaleControlValue && imageElement) {
    scaleControlValue.value = `${currentScale}%`;
    imageElement.style.transform = `scale(${currentScale / 100})`;
  }
};

const onSmallerButtonClick = (evt) => {
  evt.preventDefault();
  currentScale = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
  updateScale();
};

const onBiggerButtonClick = (evt) => {
  evt.preventDefault();
  currentScale = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
  updateScale();
};

const initScale = () => {
  const formOverlay = document.querySelector('.img-upload__overlay');
  if (!formOverlay) {
    console.error('Не найдено окно редактирования изображения');
    return;
  }

  scaleControlSmaller = formOverlay.querySelector('.scale__control--smaller');
  scaleControlBigger = formOverlay.querySelector('.scale__control--bigger');
  scaleControlValue = formOverlay.querySelector('.scale__control--value');
  imageElement = formOverlay.querySelector('.img-upload__preview img');

  console.log('Найденные элементы масштаба:', {
    smaller: !!scaleControlSmaller,
    bigger: !!scaleControlBigger,
    value: !!scaleControlValue,
    image: !!imageElement
  });

  if (!scaleControlSmaller || !scaleControlBigger || !scaleControlValue || !imageElement) {
    console.error('Не все элементы масштаба найдены');
    return;
  }

  currentScale = DEFAULT_SCALE;
  
  const newSmallerButton = scaleControlSmaller.cloneNode(true);
  const newBiggerButton = scaleControlBigger.cloneNode(true);
  
  scaleControlSmaller.replaceWith(newSmallerButton);
  scaleControlBigger.replaceWith(newBiggerButton);
  
  scaleControlSmaller = newSmallerButton;
  scaleControlBigger = newBiggerButton;

  scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
  scaleControlBigger.addEventListener('click', onBiggerButtonClick);

  updateScale();

  console.log('Масштаб инициализирован');
};

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
};

export { initScale, resetScale };