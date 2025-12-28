import { renderPictures } from './pictures-render.js';
import { photos } from './data.js';

console.log('main.js загружен');
console.log('Количество фото для отрисовки:', photos.length);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, начинаю отрисовку...');
    renderPictures(photos);
    console.log('Отрисовка завершена');
});

export { photos };