import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import PunchForm from './components/form/punch_form.jsx';
import SignUpForm from './components/form/sign_up_form.jsx';
import SignInForm from './components/form/sign_in_form.jsx';
import SignOut from './components/others/sign_out.jsx';
import AppHeader from './components/others/app_header.jsx';
import AppBottom from './components/others/app_bottom.jsx';
import NotFound from './components/pages/not_found.jsx';

import UserRepository from './repository/user_repository.jsx'

import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleUserInfo() {

  }

  handleSignIn(user) {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        slug: user.slug
      },
    });
  }

  handleSignOut() {
    this.setState({ user: null });
  }

  componentDidMount() {
    this.user_request = UserRepository.user(
      this.handleSignIn.bind(this),
      (err) => { }
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.timeInterval);
    if (this.user_request) {
      this.user_request.cancel();
    }
  }

  render() {
    const user = this.state.user;

    const logged_page = (page) => {
      return user ? page: <Redirect to='/sign-in'/>;
    }

    const unlogged_page = (page) => {
      return !user ? page: <Redirect to='/punches'/>;
    }

    return(
      <div className='app'>
        <Router>
          <AppHeader user={this.state.user}/>
          <div className='app-content'>
            <Switch>

              <Route path='/sign-in'>
                { unlogged_page(<SignInForm onSignIn={this.handleSignIn.bind(this)}/>) }
              </Route>

              <Route path='/sign-up'>
                { unlogged_page(<SignUpForm/>) }
              </Route>

              <Route path='/sign-out'>
                { logged_page(<SignOut user={user}  onSignOut={this.handleSignOut.bind(this)}/>) }
              </Route>

              <Route path='/punches'>
                { logged_page(<PunchForm user={user}/>) }
              </Route>

              <Route path='/404'>
                <NotFound/>
              </Route>

              <Route path='*'>
                <div>
                  { <Redirect to='/404'/> }
                </div>
              </Route>

            </Switch>

        </div>
        <AppBottom/>
      </Router>
    </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// function tick() {
//   ReactDOM.render(
//     <App />,
//     document.getElementById('root')
//   );
// };

// setInterval(tick, 1000);