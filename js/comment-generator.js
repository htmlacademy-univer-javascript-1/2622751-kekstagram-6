import { getRandomElement, getRandomNumber } from './util.js';
import { names, messages } from './constants.js';

const usedCommentIds = [];

function getUniqueId(existingIds) {
  let id;
  do {
    id = Math.floor(Math.random() * 1000);
  } while (existingIds.includes(id));
  existingIds.push(id);
  return id;
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

export { generateComments, getUniqueId, createComment, usedCommentIds };