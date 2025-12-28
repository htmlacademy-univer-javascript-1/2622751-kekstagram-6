const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePicture();
  }
};

const closePicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPicture = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  
  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  
  photo.comments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.className = 'social__comment';
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsContainer.appendChild(commentElement);
  });
  
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openPicture };