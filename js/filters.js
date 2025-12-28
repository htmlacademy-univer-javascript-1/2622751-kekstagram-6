import { renderPictures } from './pictures-render.js';

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const RANDOM_PHOTOS_COUNT = 10;

let currentFilter = FilterType.DEFAULT;
let photos = []; 
let filteredPhotos = []; 

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments ? photoA.comments.length : 0;
  const commentsB = photoB.comments ? photoB.comments.length : 0;
  return commentsB - commentsA; 
};

const filterPhotos = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      const shuffled = [...photos].sort(() => Math.random() - 0.5);
      filteredPhotos = shuffled.slice(0, RANDOM_PHOTOS_COUNT);
      break;
      
    case FilterType.DISCUSSED:
      filteredPhotos = [...photos].sort(compareComments);
      break;
      
    case FilterType.DEFAULT:
    default:
      filteredPhotos = [...photos];
  }
  
  return filteredPhotos;
};

const renderFilteredPhotos = () => {
  const filtered = filterPhotos();
  renderPictures(filtered);
};

const debouncedRender = debounce(renderFilteredPhotos, 500);

const onFilterChange = (evt) => {
  if (!evt.target.matches('.img-filters__button')) {
    return;
  }
  
  const clickedButton = evt.target;
  
  if (clickedButton.classList.contains('img-filters__button--active')) {
    return;
  }
  
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  
  currentFilter = clickedButton.id.replace('filter-', '');
  
  debouncedRender();
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  filteredPhotos = [...photos];
  
  const filtersContainer = document.querySelector('.img-filters');
  if (filtersContainer) {
    filtersContainer.classList.remove('img-filters--inactive');
  }
  
  const filtersForm = document.querySelector('.img-filters__form');
  if (filtersForm) {
    filtersForm.addEventListener('click', onFilterChange);
  }
  
  const defaultFilter = document.querySelector('#filter-default');
  if (defaultFilter) {
    defaultFilter.classList.add('img-filters__button--active');
  }
  
  console.log('Фильтры инициализированы');
};

export { initFilters };