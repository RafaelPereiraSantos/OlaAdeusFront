import React from 'react';
import ReactDOM from 'react-dom';
import PunchForm from './components/punch_form.jsx';
import './index.css';

class App extends React.Component {
  render() {
    const currentTime = new Date().toLocaleTimeString();
    return(
      <div className="app-content">
        <PunchForm currentTime={currentTime}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// function tick() {
//   ReactDOM.render(
//     <App />,
//     document.getElementById('root')
//   );
// };

// setInterval(tick, 1000);