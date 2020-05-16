import React from 'react';
import './styles/punch_list_item.css'

class PunchListItem extends React.Component {
  render() {
    return(
      <li>
        <div className='punch-list-item'>
          <div className='punch-list-item-right-side'>
            {this.props.punchType}
          </div>
          <div className='punch-list-item-left-side'>
            {this.props.time || 'no-time'}
          </div>
        </div>
      </li>
    );
  }
}

export default PunchListItem;