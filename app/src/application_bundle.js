import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import FormBuilder from './root';

import * as itemTypes from './components/item_types';
import * as validationTypes from './components/validation_types';

let config = {
  mountId: '',
  isEditable: false,
  endpoint: {
    url: '',
    options: {},
  },
  serializers: {
    input: null,
    output: null,
  },
};

let isRendered = false;

class FormBuilderInterface {
  constructor() {
  }

  setMountPoint(id) {
    config.mountId = id;
  }

  setUrl(url) {
    config.endpoint.url = url;
  }

  setHeaders(headers) {
    config.endpoint.options = {...config.endpoint.options, headers};
  }
  setEditMode(bool) {
    config.isEditable = bool;
  }

  setInputSerializer(func) {
    config.serializers.input = func;
  }

  setOutputSerializer(func) {
    config.serializers.output = func;
  }

  getConfigs() {
    return config;
  }

  getItemTypes() {
    return itemTypes;
  }

  getValidationTypes() {
    return validationTypes;
  }

  getItemTemplate() {
    return {
      component: {
        type: 'Contains item type. Types can be received by getItemTypes() function. Value type: string.',
        data: {
          question: 'Contains question to display. Value type: string.',
          details: 'Contains explanation (if needed) to the question. Value type: string.',
          required: 'Use it to mark the question as mandatory. Form with empty answers for mandatory question will not be submited. Value type: boolean.',
          validation: {
            validator: 'Contains validator type. Validator types can be received by getValidationTypes() function. Value type: string.',
            pattern: 'Contains validation pattern mattching validator type. Validation patterns can be received by getValidationTypes() function. Value type: string.',
            notice: 'Contains message that will be shown if validation fails. Value type: string.',
            options: {
              param1: 'Additional option that may be required for different types of validation patterns. Value type: string.',
              param2: 'Additional option that may be required for different types of validation patterns. Value type: string.',
            },
          },
          options: 'Contains options for questions which provide list of answers. Value type: array of strings.',
          answer: 'Contains answer for the question. Value type: array of strings (if question may have few answers from list) or string.',
        },
        edit: 'Use to switch between edit and preview mode of the item. Value type: boolean.',
        error: 'Shows that some errors occurred. Value type: boolean.',
        errMsg: 'Contains error messages. Value type: array of strings.',
      },
    };
  }

  renderFormBuilder() {
    if(config.mountId.length == 0) {
      console.log('Mount point is undefined!');

      return;
    }

    if(isRendered) {
      console.log('Component already rendered!');

      return;
    }

    const store = configureStore();
    render(
        <Provider store={store}>
          <FormBuilder {...config} />
        </Provider>,
        document.getElementById(config.mountId)
    );

    isRendered = true;
  }
}

window.formBuilderInterface = new FormBuilderInterface();
