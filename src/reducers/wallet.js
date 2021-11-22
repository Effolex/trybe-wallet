import { initialStateWithExpenses } from "../tests/mockData";

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
//const INITIAL_STATE = initialStateWithExpenses.wallet;
const INITIAL_STATE = {
  currencies: [],
  currencyToExchange: 'BRL',
  expenses: [],
  lastExpense: 0,
};

function wallet(state = INITIAL_STATE, action) {
  let lastExpense = 0;
  switch (action.type) {
  case '@WALLET/SAVECURRENCIES':
    return { ...state,
      currencies: [...state.currencies, ...action.state],
    };
  case '@WALLET/SAVEEXPENSES':
    lastExpense = state.lastExpense + 1;
    return { ...state,
      lastExpense,
      expenses: [...state.expenses, action.state],
    };
  case '@WALLET/REMOVEEXPENSES':
    return { ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.state)] };
  default:
    return state;
  }
}

export default wallet;
