// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '@WALLET/SAVE':
    return { ...state,
      currencies: [...state.currencies, ...action.state.currencies],
      expenses: [...state.expenses, ...action.state.expenses],
    };

  default:
    return state;
  }
}

export default wallet;
