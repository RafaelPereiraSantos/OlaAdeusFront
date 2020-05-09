import React from 'react';
import './styles/punch_list_item.css'

class PunchListItem extends React.Component {
  render() {
    return(
      <li>
        <div className='punch-list-item'>
          <div className='punch-list-item-description'>
            {this.props.punch_type}
          </div>
          <div className='punch-list-item-time'>
            {this.props.time || 'no-time'}
          </div>
        </div>
      </li>
    );
  }
}

export default PunchListItem;