import React from 'react';
import { Link } from 'react-router-dom';

import FormField from './form_field.jsx'
import UserRepository from '../../repository/user_repository.jsx'

import './styles/common_form.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_error: '',
      user_name: {
        label: 'Nome',
        id: 'user_name',
        value: '',
        error: ''
      },
      email_address: {
        label: 'Endereço de E-mail',
        id: 'email_address',
        value: '',
        error: ''
      },
      password: {
        label: 'Senha',
        id: 'password',
        value: '',
        error: ''
      },
      confirm_password: {
        label: 'Corfirme sua senha',
        id: 'confirm_password',
        value: '',
        error: ''
      },
    }
  }

  handleSubmit(event) {
    this.validateName();
    this.validateEmail();
    this.validatePassword();

    const {
      user_name,
      email_address,
      password,
      confirm_password
    } = this.state;

    if (user_name.error === '' &&
        email_address.error === '' &&
        password.error === '' &&
        confirm_password.error === '') {
      const { user_name, email_address, password } = this.state;
      UserRepository.registerUser(
        user_name,
        email_address,
        password,
        this.redirectToHome(),
        (err) => { this.setState({ form_error: err.toString() }) }
      );
    }

    event.preventDefault();
  }

  handleChange(event) {
    let newState = this.state[event.target.id];
    newState.value = event.target.value;
    this.setState(newState);
    event.preventDefault();
  }

  validateName() {
    let new_user_name_state = this.state.user_name

    if (new_user_name_state.value === '') {
      new_user_name_state.error = 'Não pode ficar em branco'
    } else {
      new_user_name_state.error = ''
    }

    this.setState({ user_name: new_user_name_state })
  }

  validateEmail() {
    let new_email_address_state = this.state.email_address

    if (new_email_address_state.value === '') {
      new_email_address_state.error = 'Não pode ficar em branco'
    } else {
      new_email_address_state.error = ''
    }

    this.setState({ email_address: new_email_address_state })
  }

  validatePassword() {
    const state = this.state;
    let new_password_state = state.password;
    let new_confirm_password_state = state.confirm_password;

    if (new_password_state.value === '') {
      new_password_state.error = 'Não pode ficar em branco';
    } else {
      new_password_state.error = ''
    }

    if (new_password_state.value != new_confirm_password_state.value) {
      new_confirm_password_state.error = 'Confirmação diferente da senha original';
    } else {
      new_confirm_password_state.error = ''
    }

    this.setState({
      password: new_password_state,
      confirm_password: new_confirm_password_state
    })
  }

  redirectToHome() {

  }

  render() {

    const onChange = this.handleChange.bind(this);
    const {
      user_name,
      email_address,
      password,
      confirm_password,
      form_error
    } = this.state;

    let error_label;

    if (form_error !== '') {
      error_label = <div className="form-bottom-item form-error-label">
        *{form_error}
      </div>
    }

    return(
      <div className="sign-up-form-content">
        <form onSubmit={this.handleSubmit.bind(this)} className="sign-up-form">
          <FormField type="text" onChange={onChange} field={user_name}/>
          <FormField type="text" onChange={onChange} field={email_address}/>
          <FormField type="password" onChange={onChange} field={password}/>
          <FormField type="password" onChange={onChange} field={confirm_password}/>
          <div className="field-input-content">
            <input type="submit" value="Cadastrar" className="submit-form-button"/>
          </div>
          <div className="form-bottom-content">
            <div className="form-bottom-item">
              Já é cadastrado? <Link to="/sign-in"> Entrar </Link>
            </div>
            {error_label}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;