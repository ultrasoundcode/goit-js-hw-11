import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { formEl, galleryEl, btnLoadMoreEl } from './elements.js';
import { renderPhotos } from './render.js';
import { searchPhotos, loadMore } from './api.js';

const Lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
Notiflix.Notify.init({ width: '450px' });

btnLoadMoreEl.classList.add('invisible');
let q = '';
let page = 1;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  galleryEl.innerHTML = '';
  page = 1;
  btnLoadMoreEl.classList.add('invisible');
  q = event.target.elements.searchQuery.value.trim();
  if (q !== '') {
    searchPhotos(page, q)
      .then(data => {
        if (data.hits.length === 0) {
          Notiflix.Notify.init({ width: '550px', position: 'center-center' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          renderPhotos(data.hits);
          Notiflix.Notify.init({ width: '550px', position: 'right-top' });
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
          btnLoadMoreEl.classList.remove('invisible');
          Lightbox.refresh();
          formEl.reset();
        }
      })
      .catch(error => console.log(error.message));
  }
});

btnLoadMoreEl.addEventListener('click', () => {
  page += 1;
  loadMore(page, q)
    .then(data => {
      if (data.hits.length === 0) {
        btnLoadMoreEl.classList.add('invisible');
        Notiflix.Notify.init({
          width: '450px',
          position: 'right-bottom',
        });
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      renderPhotos(data.hits);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      Lightbox.refresh();
    })
    .catch(error => console.log(error.message));
});
