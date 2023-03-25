import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
const Lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
Notiflix.Notify.init({ width: '450px' });

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnSearchEl = document.querySelector('.search-button');
const btnLoadMoreEl = document.querySelector('.load-more');
btnLoadMoreEl.classList.add('invisible');

const BASE_URL = 'https://pixabay.com/api/';
const API = '34722536-bec3ddb016f82f379d3e29af6';
