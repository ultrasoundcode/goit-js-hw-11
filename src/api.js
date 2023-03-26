import axios from 'axios';
import { API, BASE_URL } from './config.js';
import { renderPhotos } from './render.js';
import { btnLoadMoreEl } from './elements.js';
import Notiflix from 'notiflix';

export const searchPhotos = async (page, q) => {
  const params = new URLSearchParams({
    key: API,
    page,
    per_page: 40,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  {
    const response = await axios.get(`${BASE_URL}?${params}`);
    const photos = response;
    if (photos.status !== 200) {
      throw new Error('photos.status');
    }
    return photos.data;
  }
};

export const loadMore = async (page, q) => {
  const params = new URLSearchParams({
    key: API,
    page,
    per_page: 40,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const response = await axios.get(`${BASE_URL}?${params}`);
  const photos = response;
  if (photos.status !== 200) {
    throw new Error('photos.status');
  }
  return photos.data;
};
