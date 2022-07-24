import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const visibleComments = bigPicture.querySelector('.social__comments');
const commentsCount =  bigPicture.querySelector('.comments-count');
const commentsLoaderButton = document.querySelector('.comments-loader');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const picturesList = document.querySelector('.pictures');

function onBigPictureEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
}

function bigPictureClose() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCloseButton.removeEventListener('click', bigPictureClose);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

function bigPictureOpen() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCloseButton.addEventListener('click', bigPictureClose);
  document.addEventListener('keydown', onBigPictureEscKeydown);
  // commentsLoaderButton.addEventListener('click', loadMoreComments);
}

function getSingleComment({ avatar, message, name }) {
  const bigPictureComment = document.createElement('li');
  bigPictureComment.classList.add('social__comment');
  const socialPicture = document.createElement('img');
  socialPicture.classList.add('social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialPicture.width = 35;
  socialPicture.height = 35;
  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = message;
  bigPictureComment.append(socialPicture, socialText);
  return bigPictureComment;
}

function createSocialComments(comments) {
  const socialComments = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    socialComments.appendChild(getSingleComment(comments[i]));
  }
  return socialComments;
}

function bigPictureRender({ url, likes, comments, description }) {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  commentsCount.textContent = comments.length;
  bigPicture.querySelector('.social__comments').textContent = '';
  bigPicture.querySelector('.social__caption').textContent = description;
  visibleComments.appendChild(createSocialComments(comments.slice(0, 5)));
  bigPictureOpen();
}

function loadMoreComments(comments) {
  // const allCommentsList = comments.slice();
  const lastVisibleCommentsIndex = visibleComments.length - 1;
  if (comments.length <= 5) {
    commentsLoaderButton.classList.add('hidden');

    commentsLoaderButton.removeEventListener('click', loadMoreComments);
  } else {
    visibleComments.appendChild(createSocialComments(comments.slice(0, (lastVisibleCommentsIndex + 5))));

    commentsLoaderButton.addEventListener('click', loadMoreComments);
  }
}

// function onCommentsLoaderButtonClick() {
//   if (comments.length <= 5) {
//     commentsLoaderButton.classList.add('hidden');
//     commentsLoaderButton.removeEventListener('click', loadMoreComments);
//   } else {

//   }
// }

// commentsLoaderButton.addEventListener('click', loadMoreComments);

function initBigPicture(allImages) {
  picturesList.addEventListener('click', (evt) => {
    const id = evt.target.dataset.id;
    if (id) {
      const photo = allImages.find((item) => item.id === parseInt(id, 10));
      bigPictureRender(photo);
    }
    loadMoreComments(allImages);
  });
}

export {initBigPicture};

// Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, убрав у них класс hidden.

// В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё». Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.
