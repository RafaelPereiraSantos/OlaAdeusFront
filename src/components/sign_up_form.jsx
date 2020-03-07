import React from 'react';
import { Link } from "react-router-dom";
import './sign_up_form.css'

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
      this.registerUser();
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

    this.setState({ password: new_password_state })
    this.setState({ confirm_password: new_confirm_password_state })
  }

  registerUser() {
    const {
      user_name,
      email_address,
      password
    } = this.state;

    const punch_api_url = 'http://localhost:3001/sign-up';
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
      user: {
        name: user_name.value,
        email_address: email_address.value,
        password: password.value,
      }
    });

    fetch(punch_api_url, { method: 'post', headers: headers, body: body, credentials: 'include' })
      .then((res) => {
         this.redirectToHome();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ form_error: err.toString() });
      });
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
          <Field type="text" onChange={onChange} field={user_name}/>
          <Field type="text" onChange={onChange} field={email_address}/>
          <Field type="password" onChange={onChange} field={password}/>
          <Field type="password" onChange={onChange} field={confirm_password}/>
          <div className="field-input-content">
            <input type="submit" value="Enviar" className="submit-form-button"/>
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

function Field(props) {

  const { field, onChange, type} = props;
  const { label, id, error } = field;

  let error_label;

  if (error !== '') {
    error_label = <div className="field-error-label">
      *{error}
    </div>
  }

  return(
    <div className="field-content">
      <div className="field-label">
        {label}
      </div>
      <div className="field-input-content">
        <input type={type} onChange={onChange} id={id} className="field-input-input" />
        {error_label}
      </div>
    </div>
  );
}

export default SignUpForm;