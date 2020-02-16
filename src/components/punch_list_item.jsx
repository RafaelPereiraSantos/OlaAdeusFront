import React from 'react';
import './punch_list_item.css'

class PunchListItem extends React.Component {
  render() {
    return(
      <li>
        <div className="punch-list-item">
          <div className="punch-list-item-description">
            {this.props.description}
          </div>
          <div className="punch-list-item-time">
            {this.props.time}
          </div>
        </div>
      </li>
    );
  }
}

export default PunchListItem;