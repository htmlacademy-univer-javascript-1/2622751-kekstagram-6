import { openPicture } from './big-picture.js';

const createPhotoElement = (photo) => {
  const template = document.querySelector('#picture');
  if (!template) {
    console.error('Шаблон #picture не найден');
    return null;
  }
  
  const element = template.content.cloneNode(true);
  const link = element.querySelector('.picture');
  const img = link.querySelector('.picture__img');
  const likes = link.querySelector('.picture__likes');
  const comments = link.querySelector('.picture__comments');
  
  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments ? photo.comments.length : 0;
  
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPicture(photo);
  });
  
  return element;
};

const renderPictures = (photos) => {
  const container = document.querySelector('.pictures');
  
  if (!container) {
    console.error('Контейнер для фотографий не найден');
    return;
  }
  
  const existingPictures = container.querySelectorAll('.picture');
  existingPictures.forEach(pic => pic.remove());
  
  if (!photos || photos.length === 0) {
    const noPhotosMessage = document.createElement('p');
    noPhotosMessage.className = 'no-photos';
    noPhotosMessage.textContent = 'Фотографий пока нет';
    noPhotosMessage.style.cssText = `
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 18px;
    `;
    container.appendChild(noPhotosMessage);
    return;
  }
  
  const fragment = document.createDocumentFragment();
  
  photos.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    if (photoElement) {
      fragment.appendChild(photoElement);
    }
  });
  
  container.appendChild(fragment);
  
  console.log(`Отрисовано ${photos.length} фотографий`);
};

export { renderPictures };