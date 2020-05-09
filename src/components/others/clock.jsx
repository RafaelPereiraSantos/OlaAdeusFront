import React from 'react';
import './styles/clock.css';

class Clock extends React.Component {
  render(){
    return(
      <div className=''>
        <h3>{this.props.time}</h3>
      </div>
    );
  }
}

export default Clock;