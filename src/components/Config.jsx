import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import categoriesAPI from '../services/listOfCategoriesAPI';

class Config extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    categoriesAPI().then((result) => {
      const categories = ['Any Category',
        ...result.trivia_categories.map((obj) => obj.name)];
      this.setState(() => ({
        categories,
      }));
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <>
        <h1>Configurações</h1>
        <label htmlFor="category">
          Categoria
          <select name="category" id="category">
            { categories.map((category, index) => (
              <option value={ category } key={ index }>
                { category }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="difficulty">
          Dificuldade
          <select name="difficulty" id="difficulty">
            <option value="Any Difficulty">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label htmlFor="type">
          Tipo
          <select name="type" id="type">
            <option value="Any Type">Any Type</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True / False">True / False</option>
          </select>
        </label>
      </>
    );
  }
}
/**
Config.propTypes = {};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
*/
export default connect(null, null)(Config);
