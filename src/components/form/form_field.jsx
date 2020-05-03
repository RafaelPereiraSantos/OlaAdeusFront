import React from 'react';
import './styles/form_field.css'

class FormField extends React.Component {
  render() {
    const { field, onChange, type} = this.props;
    const { label, id, error } = field;

    let error_label;

    if (error !== '') {
      error_label = <div className="field-error-label">
        *{error}
      </div>
    }

    return(
      <div className="field-content">
        <div className="field-label">
          {label}
        </div>
        <div className="field-input-content">
          <input type={type} onChange={onChange} id={id} className="field-input-input" />
          {error_label}
        </div>
      </div>
    );
  }
}

export default FormField;