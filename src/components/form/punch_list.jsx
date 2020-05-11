import React from 'react';
import PunchListItem from './punch_list_item.jsx';
import PunchListHeader from './punch_list_header.jsx';
import './styles/punch_list.css'

class PunchList extends React.Component {
  render() {
    let punches = []

    punches.push(
      <PunchListHeader key={'title'} typeDescription={'Kind of clock'} timeDescription={'Time'}/>
    );

    for (let punch of this.props.punches) {
      const { date, time, type } = punch;
      const key = btoa(date + time + type);
      punches.push(<PunchListItem key={key} punchType={type} time={time}/>);
    }

    const noPunches = <div className='no-punches'>
      you have no punches today :(
    </div>

    let content = (punches.length > 1) ? <ol> {punches} </ol> : noPunches

    return(
      <div className='punch-list-content'>
        {content}
      </div>
    );
  }
}

export default PunchList;