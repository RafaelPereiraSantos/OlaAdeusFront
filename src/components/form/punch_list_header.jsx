import React from 'react';
import './styles/punch_list_item.css'

class PunchListHeader extends React.Component {
  render() {
    return(
      <li>
        <div className='punch-list-item'>
          <div className='punch-list-item-right-side'>
            <b>{this.props.typeDescription}</b>
          </div>
          <div className='punch-list-item-left-side'>
            <b>{this.props.timeDescription}</b>
          </div>
        </div>
      </li>
    );
  }
}

export default PunchListHeader;