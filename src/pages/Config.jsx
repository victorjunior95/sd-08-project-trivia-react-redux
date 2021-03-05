import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategoriesAPI,
  selectCategory as selectCategoryAction,
} from '../_redux/action';

class Config extends Component {
  constructor() {
    super();
    this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  onSelectCategory(e) {
    const { selectCategory } = this.props;
    selectCategory(e.target.value);
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="categories">
          Select Category:
          <select id="categories" onChange={ this.onSelectCategory }>
            {categories.map((category, i) => (
              <option
                key={ i }
                value={ category.id }
              >
                {category.name}
              </option>))}
          </select>
        </label>
        <div>
          <Link to="/">Voltar</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.trivia.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesAPI()),
  selectCategory: (category) => dispatch(selectCategoryAction(category)),
});

Config.propTypes = {
  getCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  categories: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Config);

/*
Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada
devem aparecer para a pessoa que está jogando. Essa configuração será identificada
 pela chave category no retorno da API;
*/
