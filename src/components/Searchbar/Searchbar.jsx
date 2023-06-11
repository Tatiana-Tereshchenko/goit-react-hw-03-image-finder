import { Component } from 'react';
import PropTypes from 'prop-types'; 
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            query: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
    };

    handleChange = (e) => {
        this.setState({ query: e.target.value });
    };
    
    render() {
        const { query } = this.state;
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit} >
                    <button className={css.SearchForm_button} type="submit">
                        <span className={css.SearchForm_text}>
                            Search
                        </span>
                    </button>
                    <input
                        className={css.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};