import PropTypes from 'prop-types';
import { Component } from 'react';
import css from '../styles.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseClick = () => {
    this.props.onClose();
  };

  handleImageClick = e => {
    e.stopPropagation();
  };

  render() {
    const { largeImageURL } = this.props;

    return (
      <div onClick={this.handleCloseClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img
            src={largeImageURL}
            alt="Modal"
            onClick={this.handleImageClick}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
