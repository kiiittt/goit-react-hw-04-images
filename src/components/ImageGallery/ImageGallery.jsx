import css from '../styles.module.css';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  galleryRef = React.createRef();

  scrollToNewItems() {
    if (this.galleryRef && this.galleryRef.current) {
      this.galleryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { images, onOpenModal } = this.props;

    return (
      <div ref={this.galleryRef} className={css.ImageGallery}>
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
  }
}

export default ImageGallery;


ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
