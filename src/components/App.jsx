import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../FindImage';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalCount] = useState(0);

  const galleryRef = useRef(null);

  useEffect(() => {
    galleryRef.current = React.createRef();
  }, []);

  const handleSearchSubmit = async query => {
    setImages([]);
    setCurrentPage(1);
    setQuery(query);
    setIsLoading(true);

    try {
      const fetchedImages = await fetchImages(query, 1);

      if (fetchedImages.length === 0 && fetchedImages.length <= 12) {
        setIsLoading(false);
        notify('No images found.', totalCount);
      } else {
        const newTotalCount = images.length + fetchedImages.length;
        notify('Loaded first images.', newTotalCount);
      }

      setImages(fetchedImages);
    } catch (error) {
      notify('Invalid request.', totalCount);
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;

    setIsLoading(true);

    let fetchedImages;

    try {
      fetchedImages = await fetchImages(query, nextPage);

      if (fetchedImages.length === 0 && fetchedImages.length <= 12) {
        notify('No more images found.', images.length);
        setIsLoading(false);
        return;
      }

      setImages(prevImages => [...prevImages, ...fetchedImages]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);

    // if (galleryRef.current && galleryRef.current.scrollToNewItems) {
    //   galleryRef.current.scrollToNewItems();
    // }

    const newTotalCount = images.length + fetchedImages.length;
    notify('Loaded next images.', newTotalCount);
  };

  const notify = (message, totalCount) => {
    toast(`${message} Found: ${totalCount} pcs.`);
  };

  const handleOpenModal = selectedImage => {
    setSelectedImage(selectedImage);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const isShowButton =
    images.length > 0 &&
    !isLoading &&
    images.length >= 12 &&
    images.length % 12 === 0;

  return (
    <>
      <ToastContainer />
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery
        images={images}
        onOpenModal={handleOpenModal}
        ref={galleryRef}
      />
      {isShowButton && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {selectedImage && (
        <Modal
          largeImageURL={selectedImage.largeImageURL}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default App;
