import axios from 'axios';

const BASE_KEY = '39857643-05e2eecc744bcec197d026d7d';
const BASE_URL = 'https://pixabay.com/api/';
let perPage = 12;

const baseParams = new URLSearchParams({
  key: BASE_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: perPage,
});

export const PixabayApi = async (page1, query) => {
  const data = await axios.get(
    `${BASE_URL}?${baseParams}&page=${page1}&q=${query}`
  );
  return data;
};
