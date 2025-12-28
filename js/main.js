import { renderPictures } from './pictures-render.js';
import { getData } from './api.js';
import { initForm } from './form.js';
import { showAlert } from './util.js';
import { initFilters } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.pictures');
  if (!container) {
    console.error('Контейнер для фотографий не найден');
    return;
  }
  
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
    .then((loadedPhotos) => {
      loadingIndicator.remove();
      console.log(`Успешно загружено ${loadedPhotos.length} фотографий`);
      
      renderPictures(loadedPhotos);
      
      initFilters(loadedPhotos);
      
    })
    .catch((error) => {
      loadingIndicator.remove();
      
      showAlert(error.message);
      console.error('Ошибка при загрузке фотографий:', error);
      
      container.innerHTML = `
        <div class="load-error" style="text-align: center; padding: 40px;">
          <h3 style="color: #ff4d4d; margin-bottom: 10px;">Ошибка загрузки</h3>
          <p style="margin-bottom: 20px;">${error.message}</p>
          <button id="retry-load" style="
            padding: 10px 20px;
            background-color: #4481c3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          ">
            Попробовать снова
          </button>
        </div>
      `;
      
      const retryButton = document.getElementById('retry-load');
      if (retryButton) {
        retryButton.addEventListener('click', () => {
          location.reload();
        });
      }
    });
  
  initForm();
});