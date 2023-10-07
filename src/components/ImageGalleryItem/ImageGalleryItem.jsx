import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <>
        <li className={css.gallery_item}>
          <img
            src={this.props.data.webformatURL}
            alt={this.props.data.tags}
            onClick={this.toggleModal}
          />
          {this.state.showModal && (
            <Modal
              largeImageURL={this.props.data.largeImageURL}
              toggleModal={this.toggleModal}
            ></Modal>
          )}
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;
