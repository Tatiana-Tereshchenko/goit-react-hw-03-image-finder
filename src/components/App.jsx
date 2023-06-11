import { Component } from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import css from './App.module.css';

const API_KEY = '35750052-8f7833963258536162b8e8fdc';
const BASE_URL = 'https://pixabay.com/api/';





export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      images: [],
      isLoading: false,
      currentPage: 1,
      selectedImage: null,
    };
  }

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(BASE_URL, {
        params: {
          key: API_KEY,
          q: searchQuery,
          page: currentPage,
          per_page: 12,
          image_type: 'photo',
          orientation: 'horizontal',
        },
      })
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
        }));
      })
      .catch((error) => {
        console.log('Error fetching images:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSubmit = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, images: [] }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage + 1 }),
      this.fetchImages
    );
  };

  handleImageClick = (imageUrl) => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, selectedImage } = this.state;

    return (
      <div className={css.conteiner}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onItemClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {!!images.length && <Button onClick={this.handleLoadMore} />}
        {selectedImage && <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}
