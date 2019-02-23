import React, {Component} from 'react';
import Form from './components/form_component';

class FormBuilder extends Component {
  render() {
    return (
      <Form {...this.props} />
    );
  }
}

export default FormBuilder;
