import { galleryEl } from './elements.js';

export function renderPhotos(photos) {
  const markup = photos
    .map(photo => {
      return `<div class="photo-card"><a href="${photo.largeImageURL}">
  <img class="photo" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <br> ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: <br> ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: <br> ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: <br> ${photo.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
