import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import ExpenseForms from '../components/ExpenseForms';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      cambio: 'BRL',
      expenses: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.renderForms = this.renderForms.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.fetchcurrencyInfo = this.fetchcurrencyInfo.bind(this);
    this.getConvertedValue = this.getConvertedValue.bind(this);
    this.formsDivided = this.formsDivided.bind(this);
  }

  componentDidMount() {
    const { getCurrency, currencies } = this.props;
    if (!currencies.length) getCurrency();
  }

  getConvertedValue({ exchangeRates, currency, value }) {
    return parseFloat(value) * parseFloat(exchangeRates[currency].ask);
  }

  async fetchcurrencyInfo() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  }

  async saveExpense() {
    const { expenses } = this.state;
    const { sendExpenses, lastPos, editor, edit } = this.props;
    let newExpenses = { ...expenses };
    newExpenses = { ...newExpenses };
    console.log(newExpenses);
    if (editor) {
      edit(newExpenses);
      return;
    }
    const currencies = await this.fetchcurrencyInfo();
    newExpenses.exchangeRates = currencies;
    newExpenses.id = lastPos;
    sendExpenses(newExpenses);
    expenses.value = '';
    expenses.description = '';
    this.setState(({ expenses }));
  }

  handleFormChange({ target: { name, value } }) {
    const { expenses } = this.state;
    const key = (name === 'moeda') ? 'currency' : name;
    expenses[key] = value;
    this.setState((prevState) => ({ ...prevState, expenses }));
  }

  formsDivided(value, description) {
    return (
      <>
        <input
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleFormChange }
        />
        <input
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ this.handleFormChange }
        />
      </>
    );
  }

  renderForms() {
    const { expenses: { value, description, currency, method, tag } } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        {this.formsDivided(value, description)}
        <label htmlFor="moeda">
          moeda
          <select
            name="moeda"
            id="moeda"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleFormChange }
          >
            { currencies.map((crc) => (
              <option data-testid={ crc } key={ crc } value={ crc }>{ crc }</option>)) }
          </select>
        </label>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleFormChange }
        >
          { ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'].map((element) => (
            <option key={ element } value={ element }>{ element }</option>)) }
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleFormChange }
        >
          { ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'].map((element) => (
            <option key={ element } value={ element }>{ element }</option>)) }
        </select>

        <button type="button" onClick={ this.saveExpense }>
          { (editor) ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>);
  }

  render() {
    const { email, expensesProps } = this.props;
    const { cambio } = this.state;
    const despesa = expensesProps.reduce(
      (acc, exp) => parseFloat(acc) + this.getConvertedValue(exp), 0,
    ).toFixed(2);
    return (
      <div>
        <ExpenseForms />
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            despesa:
            { (expensesProps.length) ? despesa : 0}
          </p>
          <p data-testid="header-currency-field">
            cambio:
            { cambio }
          </p>
        </header>
        { this.renderForms() }
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
  expensesProps: store.wallet.expenses,
  lastPos: store.wallet.lastExpense,
  editor: store.wallet.editor,
  idToEdit: store.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  sendExpenses: (state) => dispatch(actions.saveWalletExpenses(state)),
  getCurrency: () => dispatch(actions.fetchCurrencies()),
  edit: (state) => dispatch(actions.saveEditing(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastPos: PropTypes.number.isRequired,
  expensesProps: PropTypes.arrayOf(PropTypes.object).isRequired,
  editor: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
