// Coloque aqui suas actions

const saveUser = (state) => ({ type: '@USER/SAVE', state });

const saveWallet = (state) => ({ type: '@WALLET/SAVE', state });

const actions = { saveUser, saveWallet };

export default actions;
