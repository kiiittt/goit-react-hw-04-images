import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

const Modal = ({ largeImageURL, onClose }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleCloseClick = () => {
    onClose();
  };

  const handleImageClick = e => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div onClick={handleCloseClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="Modal" onClick={handleImageClick} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
