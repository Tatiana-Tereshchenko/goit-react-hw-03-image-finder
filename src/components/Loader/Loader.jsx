import React, { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import PropTypes from 'prop-types'; 
import css from './Loader.module.css';

export class Loader extends Component {
    render() {
        return (
            <div className={css.loader_lod}>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div>
        );
    }
}
Loader.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    radius: PropTypes.number,
    color: PropTypes.string,
    ariaLabel: PropTypes.string,
    wrapperClass: PropTypes.object,
    wrapperStyle: PropTypes.string,
    visible: PropTypes.bool
};