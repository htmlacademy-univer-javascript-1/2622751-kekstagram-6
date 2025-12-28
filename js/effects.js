const EFFECTS = {
  'none': {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
  },
  'chrome': {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'sepia': {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'marvin': {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  'phobos': {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  'heat': {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  }
};

let currentEffect = 'none';
let sliderInstance = null;

const getEffectElements = () => {
  const modal = document.querySelector('.img-upload__overlay');
  if (!modal) {
    console.warn('Модальное окно не найдено');
    return null;
  }
  
  return {
    image: modal.querySelector('.img-upload__preview img'),
    effectsList: modal.querySelector('.effects__list'),
    sliderElement: modal.querySelector('.effect-level__slider'),
    sliderContainer: modal.querySelector('.effect-level'),
    effectLevelValue: modal.querySelector('.effect-level__value'),
    effectRadios: modal.querySelectorAll('input[name="effect"]')
  };
};

const initEffect = () => {
  console.log('Инициализация эффектов...');
  
  const elements = getEffectElements();
  if (!elements) {
    console.error('Не найдены элементы эффектов');
    return;
  }
  
  const { image, effectsList, sliderElement, sliderContainer, effectLevelValue, effectRadios } = elements;
  
  console.log('Найденные элементы эффектов:', {
    image: !!image,
    effectsList: !!effectsList,
    sliderElement: !!sliderElement,
    sliderContainer: !!sliderContainer,
    effectLevelValue: !!effectLevelValue,
    effectRadios: effectRadios ? effectRadios.length : 0
  });
  
  if (!image || !effectsList || !sliderElement || !sliderContainer) {
    console.error('Не все необходимые элементы найдены');
    return;
  }
  
  if (typeof window.noUiSlider === 'undefined') {
    console.error('Библиотека noUiSlider не найдена!');
    console.log('Проверьте что в index.html подключен скрипт: <script src="vendor/nouislider/nouislider.js"></script>');
    return;
  }
  
  try {
    console.log('Создание слайдера...');
    
    if (sliderElement.noUiSlider) {
      sliderElement.noUiSlider.destroy();
    }
    
    sliderInstance = window.noUiSlider.create(sliderElement, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
      format: {
        to: (value) => Number(value),
        from: (value) => Number(value),
      },
    });
    
    console.log('Слайдер создан успешно');
  } catch (error) {
    console.error('Ошибка при создании слайдера:', error);
    return;
  }
  
  const applyEffect = () => {
    if (currentEffect === 'none') {
      image.style.filter = 'none';
      if (effectLevelValue) {
        effectLevelValue.value = '';
      }
      return;
    }
    
    const effect = EFFECTS[currentEffect];
    const sliderValue = sliderInstance.get();
    
    if (effectLevelValue) {
      effectLevelValue.value = sliderValue;
    }
    
    image.style.filter = `${effect.filter}(${sliderValue}${effect.unit})`;
    
    console.log(`Применен эффект: ${currentEffect}, значение: ${sliderValue}${effect.unit}`);
  };
  
  sliderInstance.on('update', applyEffect);
  
  const onEffectChange = (evt) => {
    if (evt.target.type === 'radio' && evt.target.name === 'effect') {
      const newEffect = evt.target.value;
      console.log(`Выбран эффект: ${newEffect}`);
      
      currentEffect = newEffect;
      
      image.className = '';
      if (newEffect !== 'none') {
        image.classList.add(`effects__preview--${newEffect}`);
      }
      
      const effectConfig = EFFECTS[newEffect];
      sliderInstance.updateOptions({
        range: {
          min: effectConfig.min,
          max: effectConfig.max,
        },
        step: effectConfig.step,
        start: effectConfig.max,
      });
      
      if (newEffect === 'none') {
        sliderContainer.classList.add('hidden');
        image.style.filter = 'none';
      } else {
        sliderContainer.classList.remove('hidden');
        applyEffect();
      }
    }
  };
  
  effectsList.addEventListener('change', onEffectChange);
  
  sliderContainer.classList.add('hidden'); 
  currentEffect = 'none';
  image.style.filter = 'none';
  
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }
  
  console.log('Эффекты инициализированы');
};

const resetEffect = () => {
  console.log('Сброс эффектов...');
  
  const elements = getEffectElements();
  if (!elements) return;
  
 const { image, sliderContainer } = elements;

  if (image) {
    image.style.filter = 'none';
    image.className = '';
  }
  
  if (sliderContainer) {
    sliderContainer.classList.add('hidden');
  }
  
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }
  
  currentEffect = 'none';
  
  if (sliderInstance) {
    sliderInstance.updateOptions({
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    });
  }
  
  console.log('Эффекты сброшены');
};

export { initEffect, resetEffect };