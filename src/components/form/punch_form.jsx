import React from 'react';
import { Redirect } from 'react-router-dom';

import PunchButton from './punch_button.jsx';
import PunchList from './punch_list.jsx';
import Clock from '../others/clock.jsx';
import './styles/punch_form.css';

const EntraceType = 'entrace';
const ExitType = 'exit';

class PunchForm extends React.Component {
  constructor(props) {
    const date = new Date()
    super(props);
    this.state = {
      currentDate: date,
      exibitionDate: date,
      timeInterval: null,
      punches: [],
      customPunch: false
    };
  }

  formatDate(date) {
    const formatNumber = (number) => {
      const numberS = number.toString()
      return numberS.length === 1 ? '0' + numberS : numberS;
    }

    const currentDay = formatNumber(date.getDate());
    const currentMonth = formatNumber(date.getMonth());

    return `${date.getFullYear()}-${currentDay}-${currentMonth}`
  }

  currentDateFormatted() {
    return this.formatDate(this.state.currentDate);
  }

  exibitionDateFormatted() {
    return this.formatDate(this.state.exibitionDate);
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

  handlePunch(type) {
    if (this.currentDateFormatted() == this.exibitionDateFormatted()) {
      console.log(this.props.user);
      const punchApiUrl = 'http://localhost:3001/punch';
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const body = JSON.stringify({
        user_id: this.props.user.id,
        date: this.currentDateFormatted(),
        time: this.state.currentDate.toLocaleTimeString().split(' ')[0],
        type: type,
      });

      fetch(punchApiUrl, { method: 'post', headers: headers, body: body, credentials: 'include' })
        .then((res) => {
          this.updatePunchList();
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      this.setState({ customPunch: true })
    }
  }

  updatePunchList() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get('date') || this.currentDateFormatted();
    console.log(date)
    const punchesApiUrl = 'http://localhost:3001/user/' + this.props.user.slug + '/punches?date=' + date;
    fetch(punchesApiUrl, { credentials: 'include' })
      .then((res) => res.json())
      .then((body) => { this.setState({ punches: body }); })
      .catch((err) => { console.log(err) });
  }

  render() {
    let redirect = null;
    if (this.state.customPunch) redirect = <Redirect to={{pathname:'/punch', search:'?date=2020-01-01'}}/>;

    return(
      <div className='punch-form-content'>
        <div className='punch-row'>
          <Clock time={this.state.currentDate.toLocaleTimeString()}/>
        </div>
        <div className='punch-list'>
          <PunchList punches={this.state.punches}/>
        </div>

        <div className='punch-buttons'>
          <div className='punch-row'>
            <PunchButton description={'Lunch Break'} onClick={this.handlePunch.bind(this)}/>
            <PunchButton description={'Lunch End'} onClick={this.handlePunch.bind(this)}/>
          </div>
          <div className='punch-row'>
            <PunchButton description={'Entrace'} onClick={this.handlePunch.bind(this)}/>
            <PunchButton description={'Exit'} onClick={this.handlePunch.bind(this)}/>
          </div>
        </div>
        {redirect}
      </div>
    );
  }
}

export default PunchForm;