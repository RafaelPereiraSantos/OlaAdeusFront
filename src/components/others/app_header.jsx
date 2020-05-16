import React from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from './header_menu.jsx'

import './styles/app_header.css';

class AppHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    }
  }

  updateDimension() {
    this.setState({width: window.innerWidth});
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimension.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimension.bind(this));
  }

  render() {
    const mobileSize = 500;
    const smallScreenSize = 780;

    const title = <div className='header-title'>
      <h1><Link to='/'>Olá Adeus</Link></h1>
    </div>

    const userMenu = <HeaderMenu user={this.props.user}/>

    const desktopContent = <div className='header-content'>
      <div className='header-content-left'>
        {title}

        { this.state.width <= smallScreenSize ? null :
          <div className='header-menu'>
            <ul className='header-menu-list'>
              <MenuItem url='/' text='Home'/>
              <MenuItem url='/punches' text='My Punches'/>
            </ul>
          </div>
        }
      </div>

      <div className='header-content-right'>
        {userMenu}
      </div>
    </div>

    const mobileContent = <div className='header-mobile-content'>
      <div className='header-content-top'>
        {title}
      </div>
      <div className='header-content-bottom'>
        {userMenu}
      </div>
    </div>

    return(
      <div className='header'>
        {this.state.width <= mobileSize ? mobileContent : desktopContent}
      </div>
    );
  }
}

function MenuItem(props) {
  return(
    <li className='header-menu-item'>
      <Link to={props.url}>{props.text}</Link>
    </li>
  );
};

export default AppHeader;