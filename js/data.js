import { getRandomElement, getRandomNumber } from './util.js';
import { generateComments } from './comment-generator.js';
import { descriptions } from './constants.js';

const photos = [];

for (let i = 1; i <= 25; i++) {
  const photo = {
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomElement(descriptions),
    likes: getRandomNumber(15, 200),
    comments: generateComments()
  };
  photos.push(photo);
}

console.log('Сгенерировано фотографий:', photos.length);

export { photos };