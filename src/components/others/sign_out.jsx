import React from 'react';
import { Redirect } from 'react-router-dom';

import UserRepository from '../../repository/user_repository.jsx'

class SignOut extends React.Component {
  componentDidMount() {
    console.log(1231231);
    this.user_sign_out = UserRepository.signOut(
      this.props.onSignOut,
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
        { this.props.user ? 'You are been redirected...' : <Redirect to='/sign-in'/> }
      </div>
    );
  }
}

export default SignOut;