import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PunchForm from './components/form/punch_form.jsx';
import SignUpForm from './components/form/sign_up_form.jsx';
import SignInForm from './components/form/sign_in_form.jsx';
import SignOut from './components/others/sign_out.jsx';
import AppHeader from './components/others/app_header.jsx';
import AppBottom from './components/others/app_bottom.jsx';

import './index.css';

class App extends React.Component {
  render() {
    const currentTime = new Date().toLocaleTimeString();
    return(
      <div className="app">
        <Router>
          <AppHeader/>
          <div className="app-content">
            <Switch>

              <Route path="/sign-in">
                <SignInForm/>
              </Route>

              <Route path="/sign-up">
                <SignUpForm/>
              </Route>

              <Route path="/sign-out">
                <SignOut/>
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

        </div>
        <AppBottom/>
      </Router>
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