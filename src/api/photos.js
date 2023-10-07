import axios from 'axios';

export default class PixabayApi {
  BASE_KEY = '39857643-05e2eecc744bcec197d026d7d';
  BASE_URL = 'https://pixabay.com/api/';

  perPage = 12;
  page = 41;
  query = null;

  async fetchImg() {
    const baseParams = new URLSearchParams({
      key: this.BASE_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: this.perPage,
      page: this.page,
      q: this.query,
    });

    const data = await axios.get(`${this.BASE_URL}?${baseParams}`);
    return data;
  }
  changePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
