const COMMENTS_PER_PAGE = 5; 
let currentPhotoComments = []; 
let shownCommentsCount = 0; 

const closePicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  
  currentPhotoComments = [];
  shownCommentsCount = 0;
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePicture();
  }
};

const showMoreComments = () => {
  const commentsContainer = document.querySelector('.social__comments');
  const commentsCounter = document.querySelector('.social__comment-count');
  const loadButton = document.querySelector('.comments-loader');
  
  const commentsToShow = currentPhotoComments.slice(
    shownCommentsCount, 
    shownCommentsCount + COMMENTS_PER_PAGE
  );
  
  commentsToShow.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.className = 'social__comment';
    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsContainer.appendChild(commentElement);
  });
  
  shownCommentsCount += commentsToShow.length;
  
  commentsCounter.innerHTML = `
    ${shownCommentsCount} из <span class="comments-count">${currentPhotoComments.length}</span> комментариев
  `;
  
  if (shownCommentsCount >= currentPhotoComments.length) {
    loadButton.classList.add('hidden');
  }
};


const openPicture = (photo) => {
  const bigPicture = document.querySelector('.big-picture');
  
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  
  currentPhotoComments = photo.comments;
  shownCommentsCount = 0;
  
  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  
  const loadButton = bigPicture.querySelector('.comments-loader');
  loadButton.addEventListener('click', showMoreComments);
  
  showMoreComments();
  
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  
  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closePicture);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openPicture };