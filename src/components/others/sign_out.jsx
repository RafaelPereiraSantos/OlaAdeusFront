import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import UserRepository from '../../repository/user_repository.jsx'

class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: true
    };
  }

  componentDidMount() {
    this.user_sign_out = UserRepository.signOut(
      (res) => { this.setState({ logged: false }) },
      (err) => {}
    );
  }

  componentWillUnmount() {
    if (this.user_sign_out) {
      this.user_sign_out.cancel();
    }
  }

  render() {
    return(
      <div>
        { this.state.logged ? 'você esta sendo redirecionado' : <Redirect to="/sign-in"/> }
      </div>
    );
  }
}

export default SignOut;