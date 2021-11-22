// Coloque aqui suas action
const saveUser = (state) => ({ type: '@USER/SAVE', state });

const saveWalletCurrencies = (state) => ({ type: '@WALLET/SAVECURRENCIES', state });
const saveWalletExpenses = (state) => ({ type: '@WALLET/SAVEEXPENSES', state });
const removeExpense = (state) => ({ type: '@WALLET/REMOVEEXPENSES', state });
const activateEditing = (id) => ({ type: '@WALLET/ACTIVATEEDITED',
  state: { editor: true, idToEdit: id } });
const saveEditing = (state) => ({ type: '@WALLET/SAVEEDITING',
  state });

function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data);
    dispatch(saveWalletCurrencies(currencies.filter((currency) => currency !== 'USDT')));
  };
}

const actions = {
  saveUser,
  saveWalletExpenses,
  fetchCurrencies,
  removeExpense,
  activateEditing,
  saveEditing,
};

export default actions;
