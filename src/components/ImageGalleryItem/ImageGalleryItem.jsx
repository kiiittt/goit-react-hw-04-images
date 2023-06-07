import PropTypes from 'prop-types';
import css from '../styles.module.css';

const ImageGalleryItem = ({ image, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(image);
  };

  return (
    <li>
      <img
        src={image.webformatURL}
        alt={image.alt}
        onClick={handleClick}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
