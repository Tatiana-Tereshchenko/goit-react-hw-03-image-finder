import { Component } from 'react';
import PropTypes from 'prop-types'; 
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
    render() {
    const { imageUrl, onItemClick } = this.props;
    return (
        <li className={css.ImageGalleryItem} onClick={onItemClick}>
        <img className={css.ImageGalleryItem_image} src={imageUrl} alt="" />
        </li>
    );
    }
}

ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
};