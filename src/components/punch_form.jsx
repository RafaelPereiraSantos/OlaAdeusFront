import React from 'react';
import AppHeader from './app_header.jsx';
import PunchButton from './punch_button.jsx';
import PunchList from './punch_list.jsx';
import Clock from './clock.jsx';
import './punch_form.css'

class PunchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      punches: [],
      currentTime: new Date()
    };
  }

  componentDidMount() {
    this.updatePunchList();
  }

  handlerPunch(type, currentTime) {
    const punch_api_url = 'http://localhost:3001/punch';
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
      punch_type: type,
      punch_time: currentTime
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
    const punches_api_url = 'http://localhost:3001/punches';

    fetch(punches_api_url, { credentials: 'include' })
      .then((res) => res.json())
      .then((body) => {
        this.setState({ punches: body });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    return(
      <div className="punch-form-content">
        <div className="punch-row">
          <AppHeader/>
        </div>
        <div className="punch-row">
          <Clock time={this.state.currentTime.toLocaleTimeString()}/>
        </div>
        <div className="punch-list">
          <PunchList punches={this.state.punches}/>
        </div>

        <div className="punch-buttons">
          <div className="punch-row">
            <PunchButton description={"Saida Almoço"} onClick={this.handlerPunch}/>
            <PunchButton description={"Volta Almoço"} onClick={this.handlerPunch}/>
          </div>
          <div className="punch-row">
            <PunchButton description={"Entrada"} onClick={this.handlerPunch}/>
            <PunchButton description={"Saida"} onClick={this.handlerPunch}/>
          </div>
        </div>
      </div>
    );
  }
}

export default PunchForm;