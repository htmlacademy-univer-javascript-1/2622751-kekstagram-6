import { renderPictures } from './pictures-render.js';
import { getData } from './api.js';
import { initForm } from './form.js';
import { showAlert } from './util.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.pictures');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.textContent = 'Загрузка фотографий...';
  loadingIndicator.style.cssText = `
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #666;
  `;
  container.appendChild(loadingIndicator);
  
  getData()
    .then((photos) => {
      loadingIndicator.remove();
      console.log(`Успешно загружено ${photos.length} фотографий`);
      renderPictures(photos);
    })
    .catch((error) => {
      loadingIndicator.remove();
      
      showAlert(error.message);
      console.error('Ошибка при загрузке фотографий:', error);
      
      container.innerHTML = `
        <div class="load-error" style="text-align: center; padding: 40px;">
          <h3 style="color: #ff4d4d;">Ошибка загрузки</h3>
          <p>${error.message}</p>
          <button id="retry-load" style="
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #4481c3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          ">
            Попробовать снова
          </button>
        </div>
      `;
      
      document.getElementById('retry-load').addEventListener('click', () => {
        location.reload();
      });
    });
  
  initForm();
});