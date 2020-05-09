import React from 'react';
import './styles/punch_button.css';

class PunchButton extends React.Component {
  render() {
    const type = this.props.description.toLocaleLowerCase().replace(/ /g, '-')
    return(
      <button className='punch-button'
              onClick={() => this.props.onClick(type)}>
        {this.props.description}
      </button>
    );
  }
}

export default PunchButton;