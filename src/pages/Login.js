import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isvalidEmail: false,
      isvalidPassword: false,
    }

    this.handleValues = this.handleValues.bind(this);
    this.sendUser = this.sendUser.bind(this);
  }

  handleValues({ target }) {
    const VALID_LENGTH = 6;
    switch (target.type) {
      case 'email':
        const validEmail = new RegExp(/[\w\d]+@[\w\d]+[.][\w]+/);
        this.setState({ [target.type]: target.value, isvalidEmail: validEmail.test(target.value) });
        break;
      case 'password':
        this.setState({ [target.type]: target.value, isvalidPassword: (target.value.length >= VALID_LENGTH) });
        break;
      default:
        break;
    }
  }

  sendUser() {
    const { saveUser } = this.props;
    const { email, password } = this.state;
    saveUser({ email, password});
  }

  render() {
    const { email, password, isvalidEmail, isvalidPassword } = this.state;
    return (
      <div>
        <input type="email" value={ email } onChange={ this.handleValues } data-testid="email-input" />
        <input type="password" value={ password } onChange={ this.handleValues } data-testid="password-input" />
        <Link to="/carteira">
          <button type="button" disabled={ !(isvalidEmail && isvalidPassword) } onClick={ this.sendUser}> Entrar </button>
        </Link >
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (state) => dispatch(actions.saveUser(state))});

// Podemos utilizar o mapDispatchToProps de outra forma também! Lembra do arquivo que foi criado contendo a função "newAction?
// No exemplo acima, o dispatch está recebendo como argumento a "newAction", que também é chamada de `action creator`.
// E é aí que está a vantagem de utilizar  as `action creator`, pois elas também geram uma `action`.

export default connect(null, mapDispatchToProps)(Login);