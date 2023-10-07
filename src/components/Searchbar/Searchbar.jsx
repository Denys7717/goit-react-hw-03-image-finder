import { Component } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
  state = { query: '' };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return Notiflix.Notify.failure('Empty');
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.button}>
              <span className={css.buttonLabel}>Search</span>
            </button>
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}
