import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import PixabayApi from 'api/photos';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';

const pixabayApi = new PixabayApi();

export class App extends Component {
  state = {
    query: '',
    hits: null,
    showBtn: false,
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      pixabayApi.query = this.state.query;
      pixabayApi.resetPage();
      this.setState({ hits: [], showBtn: false, loading: true });

      pixabayApi
        .fetchImg()
        .then(({ data }) => {
          if (data.hits.length < 1) {
            Notiflix.Notify.failure('Not found');
            this.setState({ loading: false });
            return;
          }
          Notiflix.Notify.success(
            `Found for your request ${data.totalHits} picture`
          );

          if (data.hits.length >= pixabayApi.per_page) {
            this.setState({ showButton: true });
          }

          this.setState({ hits: data.hits, showBtn: true, loading: false });
        })
        .catch(error => Notiflix.Notify.warning(error));
    }
  }

  loadMore = () => {
    pixabayApi.changePage();
    this.setState({
      showBtn: false,
      loading: true,
    });
    pixabayApi
      .fetchImg()
      .then(({ data }) => {
        if (data.hits.length < pixabayApi.perPage) {
          Notiflix.Notify.info('Finish for you');
          return;
        }

        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          showBtn: true,
          loading: false,
        }));
      })
      .catch(error => Notiflix.Notify.warning(error));
  };

  onSubmit = query => {
    this.setState({
      query,
    });
  };

  render() {
    return (
      <>
        <div className={css.app}>
          <Searchbar onSubmit={this.onSubmit} />
          {this.state.hits && <ImageGallery data={this.state.hits} />}
          {this.state.showBtn && <Button loadMore={this.loadMore} />}
          {this.state.loading && <Loader />}
        </div>
      </>
    );
  }
}
