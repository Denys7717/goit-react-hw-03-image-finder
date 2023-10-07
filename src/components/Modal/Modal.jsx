import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = event => {
    if (event.code === 'Escape') this.props.toggleModal();
  };

  closeBackDrop = event => {
    if (event.currentTarget === event.target) this.props.toggleModal();
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.closeBackDrop}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
