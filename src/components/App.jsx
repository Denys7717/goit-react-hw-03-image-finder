import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { PixabayApi } from 'api/photos';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    query: '',
    hits: [],
    showBtn: null,
    loading: false,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ showBtn: false, loading: true });

      PixabayApi(this.state.page, this.state.query)
        .then(({ data }) => {
          if (this.state.query !== prevState.query) {
            Notiflix.Notify.success(
              `Found for your request ${data.totalHits} picture`
            );
          }

          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits],
            showBtn: true,
            loading: false,
          }));
          if (this.state.page >= data.totalHits / 12) {
            this.setState({
              showBtn: false,
            });
          }
        })

        .catch(error => Notiflix.Notify.warning(error));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      showBtn: false,
      loading: true,
      page: prevState.page + 1,
    }));
  };

  onSubmit = query => {
    this.setState({
      query,
      hits: [],
      page: 1,
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
