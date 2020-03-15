import React from 'react';
import PunchListItem from './punch_list_item.jsx';

class PunchList extends React.Component {
  render() {
    let punches = []

    for (let punch of this.props.punches) {
      const { description, time } = punch;
      const key = btoa(description + time);
      punches.push(<PunchListItem key={key} description={description} time={time}/>);
    }

    return(
      <ol>
        {punches}
      </ol>
    );
  }
}

export default PunchList;