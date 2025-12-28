const names = ['Иван', 'Мария', 'Артём', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Алексей', 'Ольга', 'Павел'];

const descriptions = [
  'Прекрасный закат на море',
  'Мой пушистый друг',
  'Горный пейзаж',
  'Уютное кафе в старом городе',
  'Архитектура современного города',
  'Летний пикник с друзьями',
  'Зимняя сказка в лесу',
  'Уличное искусство',
  'Моя новая коллекция',
  'Вкусный домашний обед',
  'Путешествие по неизведанным местам',
  'Спортивные достижения'
];

const messages = [
'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];


const usedCommentIds = [];

function getUniqueId(existingIds) {
  let id;
  do {
    id = Math.floor(Math.random() * 1000);
  } while (existingIds.includes(id));
  existingIds.push(id);
  return id;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createComment() {
  const messageCount = getRandomNumber(1, 2);
  let message = '';
  
  for (let i = 0; i < messageCount; i++) {
    if (i > 0) {
      message += ' ';
    }
    message += getRandomElement(messages);
  }
  
  return {
    id: getUniqueId(usedCommentIds),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: message,
    name: getRandomElement(names)
  };
}

function generateComments() {
  const commentsCount = getRandomNumber(0, 30); 
  const comments = [];
  
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }
  return comments;
}

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

console.log(photos);
console.log(`Создано ${photos.length} фотографий`);
console.log(`Использовано ${usedCommentIds.length} уникальных ID для комментариев`);

export { photos };