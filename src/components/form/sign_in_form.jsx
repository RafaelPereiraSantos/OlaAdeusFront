import React from 'react';
import { Link } from 'react-router-dom';

import FormTitle from './form_title.jsx'
import FormField from './form_field.jsx'
import UserRepository from '../../repository/user_repository.jsx'

import './styles/common_form.css'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_error: '',
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
      }
    }
  }

  handleSubmit(event) {
    this.validateEmail();
    this.validatePassword();

    const { email_address, password } = this.state;

    const handleException = (e) => {
      handleErrorMessage(e.toString())
    };

    const handleErrorMessage = (err) => {
      this.setState({ form_error: err.toString() })
    };

    const handleResponse = (body) => {
      if (body.error_message) {
        handleErrorMessage(body.error_message);
      } else {
        this.props.onSignIn(body);
      }
    };

    if (email_address.error === '' && password.error === '') {
      const { email_address, password } = this.state;
      UserRepository.signIn(
        email_address,
        password,
        handleResponse,
        handleException
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

    if (new_password_state.value === '') {
      new_password_state.error = 'Não pode ficar em branco'
    } else {
      new_password_state.error = ''
    }

    this.setState({ password: new_password_state })
  }

  render() {

    const onChange = this.handleChange.bind(this);
    const {
      email_address,
      password,
      form_error
    } = this.state;

    let error_label;

    if (form_error !== '') {
      error_label = <div className='form-bottom-item form-error-label'>
        *{form_error}
      </div>
    }

    return(
      <div className='sign-up-form-content'>
        <FormTitle title='Entrar'/>
        <form onSubmit={this.handleSubmit.bind(this)} className='sign-up-form'>
          <FormField type='text' onChange={onChange} field={email_address}/>
          <FormField type='password' onChange={onChange} field={password}/>
          <div className='field-input-content'>
            <input type='submit' value='Entrar' className='submit-form-button'/>
          </div>
          <div className='form-bottom-content'>
            <div className='form-bottom-item'>
              Ainda não é cadastrado? <Link to='/sign-up'> Cadastrar-se </Link>
            </div>
            {error_label}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;