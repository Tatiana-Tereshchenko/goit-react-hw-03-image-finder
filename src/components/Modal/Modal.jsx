import { Component } from 'react';
import PropTypes from 'prop-types'; 
import css from './Modal.module.css';

export class Modal extends Component {
    componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
    if (e.keyCode === 27) {
        this.props.onClose();
    }
    };

    handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
        this.props.onClose();
    }
    };

    render() {
    const { imageUrl } = this.props;
    return (
        <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
            <img src={imageUrl} alt="" />
        </div>
        </div>
    );
    }
}
Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};