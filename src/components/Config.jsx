import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import categoriesAPI from '../services/listOfCategoriesAPI';
import { saveConfig } from '../redux/actions';

class Config extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveConfig = this.handleSaveConfig.bind(this);
    this.state = {
      categories: [],
      category: 'Any Category',
      difficulty: 'Any Difficulty',
      type: 'Any Type',
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

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSaveConfig() {
    const { saveConfigAction, show } = this.props;
    const { category, difficulty, type } = this.state;
    saveConfigAction({ category, difficulty, type });
    show();
  }

  render() {
    const { categories, category, difficulty, type } = this.state;
    return (
      <>
        <h1>Configurações</h1>
        <label htmlFor="category">
          Categoria
          <select
            name="category"
            id="category"
            onChange={ this.handleChange }
            value={ category }
          >
            { categories.map((cat, index) => (
              <option value={ cat } key={ index }>
                { cat }
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="difficulty">
          Dificuldade
          <select
            name="difficulty"
            id="difficulty"
            onChange={ this.handleChange }
            value={ difficulty }
          >
            <option value="Any Difficulty">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>

        <label htmlFor="type">
          Tipo
          <select
            name="type"
            id="type"
            onChange={ this.handleChange }
            value={ type }
          >
            <option value="Any Type">Any Type</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True / False">True / False</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleSaveConfig }
        >
          SALVAR
        </button>
      </>
    );
  }
}

Config.propTypes = {
  saveConfigAction: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  saveConfigAction: (obj) => dispatch(saveConfig(obj)),
});

export default connect(null, mapDispatchToProps)(Config);
