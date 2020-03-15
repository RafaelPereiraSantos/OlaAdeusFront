import React from 'react';
import { Link } from 'react-router-dom';

import UserRepository from '../../repository/user_repository.jsx'

import './styles/app_header.css';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.user_request = UserRepository.user(
      (user) => {
        this.setState({ user: user })
        console.log(111);
      },
      (err) => { }
    )
  }

  componentWillUnmount() {
    if (this.user_request) {
      this.user_request.cancel();
    }
  }

  render() {
    const { user } = this.state;
    let content_right = null;

    if (user === null) {

      content_right = <div className="header-content-right">
        <div className="header-menu">
          <ul className="header-menu-list">
            <MenuItem url="/sign-in" text="Sign-in"/>
            <MenuItem url="/sign-up" text="Sign-up"/>
          </ul>
        </div>
      </div>

    } else {

      content_right = <div className="header-content-right">
        <div className="header-menu">
          <ul className="header-menu-list">
            <MenuItem url="/sign-out" text="Sign-out"/>
          </ul>
        </div>
        <div className="user-name">
          <h2><Link to="/profile">{user.name}</Link></h2>
        </div>
      </div>

    }

    return(
      <div className="header">
        <div className="header-content">

          <div className="header-content-left">
            <div className="header-title">
              <h1><Link to="/">Olá Adeus</Link></h1>
            </div>

            <div className="header-menu">
              <ul className="header-menu-list">
                <MenuItem url="/" text="Home"/>
                <MenuItem url="/punches" text="My Punches"/>
              </ul>
            </div>
          </div>

          {content_right}

        </div>
      </div>
    );
  }
}

function MenuItem(props) {

  return(
    <li className="header-menu-item">
      <Link to={props.url}>{props.text}</Link>
    </li>
  );
};

export default AppHeader;