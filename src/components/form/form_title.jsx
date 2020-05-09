import React from 'react';

import './styles/form_title.css'

class FormTitle extends React.Component {
  render() {
    return(
      <div className='title-content'>
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

export default FormTitle;