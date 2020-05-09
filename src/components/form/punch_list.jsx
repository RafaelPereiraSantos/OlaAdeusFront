import React from 'react';
import PunchListItem from './punch_list_item.jsx';
import PunchListHeader from './punch_list_header.jsx';

class PunchList extends React.Component {
  render() {
    let punches = []

    punches.push(
      <PunchListHeader key={'title'} type_description={'Tipo'} time_description={'Horario'}/>
    );
    for (let punch of this.props.punches) {
      const { date, time, type } = punch;
      const key = btoa(date + time + type);
      punches.push(<PunchListItem key={key} punch_type={type} time={time}/>);
    }

    return(
      <ol>
        {punches}
      </ol>
    );
  }
}

export default PunchList;