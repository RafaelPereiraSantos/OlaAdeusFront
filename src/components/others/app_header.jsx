import React from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from './header_menu.jsx'

import './styles/app_header.css';

class AppHeader extends React.Component {
  render() {
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
          <div className="header-content-right">
            <HeaderMenu user={this.props.user}/>
          </div>
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