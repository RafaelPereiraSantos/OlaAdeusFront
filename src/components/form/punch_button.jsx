import React from 'react';
import './styles/punch_button.css';

class PunchButton extends React.Component {
  render() {
    return(
      <button className="punch-button"
              onClick={() => this.props.onClick(this.props.description, new Date())}>
        {this.props.description}
      </button>
    );
  }
}

export default PunchButton;