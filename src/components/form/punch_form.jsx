import React from 'react';
import PunchButton from './punch_button.jsx';
import PunchList from './punch_list.jsx';
import Clock from '../others/clock.jsx';
import './styles/punch_form.css'

class PunchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      timeInterval: null,
      punches: [],
    };
  }

  componentDidMount() {
    this.updatePunchList();

    const oneSec = 1000;
    this.setState({
      timeInterval: setInterval(() => {
        this.setState({ currentDate: new Date() });
      },
      oneSec)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timeInterval);
  }

  handlerPunch(type) {
    console.log(this.props.user);
    const punch_api_url = 'http://localhost:3001/punch';
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const date = this.state.currentDate;

    const formatNumber = (number) => {
      const number_s = number.toString()
      return number_s.length === 1 ? '0' + number_s : number_s;
    }

    const currentDay = formatNumber(date.getDate());
    const currentMonth = formatNumber(date.getMonth());

    const body = JSON.stringify({
      user_id: this.props.user.id,
      date: `${date.getFullYear()}-${currentDay}-${currentMonth}`,
      time: date.toLocaleTimeString().split(' ')[0],
      type: type,
    });

    fetch(punch_api_url, { method: 'post', headers: headers, body: body, credentials: 'include' })
      .then((res) => {
        this.updatePunchList();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  updatePunchList() {
    const punches_api_url = 'http://localhost:3001/user/' + this.props.user.slug + '/punches';
    fetch(punches_api_url, { credentials: 'include' })
      .then((res) => res.json())
      .then((body) => { this.setState({ punches: body }); })
      .catch((err) => { console.log(err) });
  }

  render() {
    return(
      <div className='punch-form-content'>
        <div className='punch-row'>
          <h3>Time now</h3>
        </div>
        <div className='punch-row'>
          <Clock time={this.state.currentDate.toLocaleTimeString()}/>
        </div>
        <div className='punch-list'>
          <PunchList punches={this.state.punches}/>
        </div>

        <div className='punch-buttons'>
          <div className='punch-row'>
            <PunchButton description={'Lunch Break'} onClick={this.handlerPunch.bind(this)}/>
            <PunchButton description={'Lunch End'} onClick={this.handlerPunch.bind(this)}/>
          </div>
          <div className='punch-row'>
            <PunchButton description={'Entrace'} onClick={this.handlerPunch.bind(this)}/>
            <PunchButton description={'Exit'} onClick={this.handlerPunch.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default PunchForm;