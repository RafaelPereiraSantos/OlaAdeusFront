import React from 'react';
import './styles/clock.css';

import { Link } from 'react-router-dom';

class Clock extends React.Component {
  render(){
    return(
      <div className='clock-content'>

        <div className='clock-side'>
          <Link to='/punches'> See Yesterday </Link>
        </div>

        <div className='clock-middle'>
          <div className='clock-current-title'>
            <h3>Time now</h3>
          </div>
          <div className='clock-current-time'>
            <h3>{this.props.time}</h3>
          </div>
        </div>

        <div className='clock-side'>
          <Link to='/punches'> See Tomorrow </Link>
        </div>

      </div>
    );
  }
}

export default Clock;