import { renderPictures } from './pictures-render.js';
import { photos } from './data.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  renderPictures(photos);
  initForm();
});

export { photos };