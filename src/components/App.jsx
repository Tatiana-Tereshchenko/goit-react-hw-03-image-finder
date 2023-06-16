import { Component } from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ApiService } from './ApiService/ApiService';
import css from './App.module.css';



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      images: [],
      isLoading: false,
      currentPage: 1,
      selectedImage: null,
      totalPages: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    this.setState({ isLoading: true });

    ApiService.fetchImages(searchQuery, currentPage)
      .then((response) => {
        const { hits, totalHits } = response.data;
        this.setState((prevState) => ({
          images: currentPage === 1 ? hits : [...prevState.images, ...hits],
          totalPages: Math.ceil(totalHits / 12),
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
    this.setState(
      { searchQuery: query, currentPage: 1, images: [], totalPages: 0 },
     
    );
  };

  handleLoadMore = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState(
        (prevState) => ({ currentPage: prevState.currentPage + 1, isLoading: true }),
       
      );
    }
  };

  handleImageClick = (imageUrl) => {
    this.setState({ selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, selectedImage, currentPage, totalPages } = this.state;
    const showLoadMoreButton = images.length > 0 && currentPage < totalPages;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onItemClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.handleLoadMore} />}
        {selectedImage && <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}