import React, { forwardRef } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from '../styles.module.css';

const ImageGallery = forwardRef(({ images, onOpenModal }, ref) => {
  return (
    <div ref={ref} className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onOpenModal={onOpenModal}
          className={css.ImageGalleryItem}
        />
      ))}
    </div>
  );
});

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
