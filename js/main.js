import { renderPictures } from './pictures-render.js';
import { photos } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  renderPictures(photos);
});

export { photos };