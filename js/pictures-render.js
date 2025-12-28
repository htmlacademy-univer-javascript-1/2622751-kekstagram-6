const createPhotoElement = (photo) => {
  const template = document.querySelector('#picture');
  const element = template.content.cloneNode(true);
  
  const link = element.querySelector('.picture');
  const img = link.querySelector('.picture__img');
  const likes = link.querySelector('.picture__likes');
  const comments = link.querySelector('.picture__comments');
  
  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;
  
  link.dataset.id = photo.id;
  
  return element;
};

const renderPictures = (photos) => {
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  
  photos.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    fragment.appendChild(photoElement);
  });
  
  container.innerHTML = '';
  container.appendChild(fragment);
};

export { renderPictures };