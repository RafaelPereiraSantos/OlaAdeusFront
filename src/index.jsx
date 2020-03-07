import React from 'react';
import ReactDOM from 'react-dom';
import PunchForm from './components/punch_form.jsx';
import SignUpForm from './components/sign_up_form.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './index.css';

class App extends React.Component {
  render() {
    const currentTime = new Date().toLocaleTimeString();
    return(
      <div className="app">
        <div className="app-content">
        <Router>
          <Switch>

            <Route path="/sign-in">
              sign in
            </Route>

            <Route path="/sign-up">
              <SignUpForm/>
            </Route>

            <Route path="/punches">
              <PunchForm currentTime={currentTime}/>
            </Route>

            <Route path="*">
              <div>
                not found
              </div>
            </Route>

          </Switch>
        </Router>

      </div>
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