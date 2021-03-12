import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      amount: 10,
      category: 'any',
      difficulty: 'any',
      type: 'any',
    };
  }

  handleChange(e) {
    const {
      target: { name, value },
    } = e;
    this.setState(
      {
        [name]: value,
      },
    );
  }

  render() {
    return (
      <>
        <h1 data-testid="settings-title">Página de configurações</h1>
        <form className="form-inline form-flex">
          <div className="form-group mb-2">
            <label htmlFor="amount">
              Selecione a quantidade de perguntas:
              <input
                type="number"
                name="amount"
                className="form-control"
                min="1"
                max="50"
                value="10"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="category">
              Selecione a categoria:
              <select
                name="category"
                className="form-control"
                onChange={ this.handleChange }
              >
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals &amp; Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                <option value="32">Entertainment: Cartoon &amp; Animations</option>
              </select>
            </label>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="amount">
              Selecione a dificuldade das perguntas:
              <select
                name="difficulty"
                className="form-control"
                onChange={ this.handleChange }
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="amount">
              Selecione o tipo das perguntas:
              <select
                name="type"
                className="form-control"
                onChange={ this.handleChange }
              >
                &gt;
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </label>
          </div>
        </form>
      </>
    );
  }
}

export default Settings;
