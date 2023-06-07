import css from '../styles.module.css';
// import PropTypes from 'prop-types';
import { Component } from 'react';


export default class Searchbar extends Component {
  state = {
    value: ' ',
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      return 'Please input tag for searching images';
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <div className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className="button-label"></span>
          </button>

          <input
            name="value"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
            className={css.SearchFormInput}
          />
        </form>
      </div>
    );
  }
}

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
