import { photos } from './data.js';
import { usedCommentIds } from './comment-generator.js';

console.log(photos);
console.log(`Создано ${photos.length} фотографий`);
console.log(`Использовано ${usedCommentIds.length} уникальных ID для комментариев`);

export { photos };