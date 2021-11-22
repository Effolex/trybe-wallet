import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';

class ExpenseForms extends React.Component {
  // exchangeRates[currency].name
  constructor() {
    super();
    this.expenseFormated = this.expenseFormated.bind(this);
  }

  expenseFormated(expense) {
    const { currency, exchangeRates, id } = expense;
    const { changeExpense, activateEd } = this.props;
    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{exchangeRates[currency].name.replace('/Real Brasileiro', '')}</td>
        <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
        <td>
          {parseFloat(exchangeRates[currency].ask * parseFloat(expense.value)).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => { activateEd(id); } }
          >
            Editar
          </button>

          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => { changeExpense(id); } }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    const table = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            { table.map((titulo) => (<th key={ titulo }>{titulo}</th>)) }
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (this.expenseFormated(expense)))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  changeExpense: (state) => dispatch(actions.removeExpense(state)),
  activateEd: (state) => dispatch(actions.activateEditing(state)),
});

ExpenseForms.propTypes = {
  changeExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  activateEd: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForms);
