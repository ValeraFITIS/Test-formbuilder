import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import OneLineAnswer from '../components/one_line_answer_component';
import ValidationOptions from '../components/validation_options_component';
import TypeSelector from '../components/type_selector_component'; 
import configureStore from '../store/configureStore';
import * as types from '../components/item_types';


describe('One line answer component', () => {
  it('render in edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_LINE_ASWER_TYPE,
          data: {
            question: '',
            details: '',
            required: false,
            validation: null
          }
        },
        edit: true,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneLineAnswer index={0}/>
                            </Provider>);
    
    expect(component.find(OneLineAnswer).find('#question').exists()).toBeTruthy();
    expect(component.find(OneLineAnswer).find('#required').exists()).toBeTruthy();
    expect(component.find(OneLineAnswer).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(OneLineAnswer).find(ValidationOptions).exists()).toBeTruthy();  
    component.unmount();  
  });

  it('render in preview mode', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_LINE_ASWER_TYPE,
          data: {
            question: 'Some question',
            details: ''
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneLineAnswer index={0}/>
                            </Provider>);
    
    expect(component.find(OneLineAnswer).find('#answer').exists()).toBeTruthy();
    expect(component.text()).toContain('Some question');  
    component.unmount();  
  });

  it('save after edit', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_LINE_ASWER_TYPE,
          data: {
            question: '',
            details: '',
            required: false,
            validation: null
          }
        },
        edit: true,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneLineAnswer index={0} enableEdit={true} />
                            </Provider>);
    component.find(OneLineAnswer).find('#question').simulate('change', {target: {value: 'my question'}});
    component.find(OneLineAnswer).find('#details').simulate('change', {target: {value: 'some details'}});
    component.find(OneLineAnswer).find('#required').simulate('change', {target: {checked: true}});
    component.find(OneLineAnswer).simulate("doubleclick");
    expect(component.text()).toContain('my question (*Required field)');
    expect(component.text()).toContain('some details');
    component.unmount();  
  });

  it('switch to edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_LINE_ASWER_TYPE,
          data: {
            question: 'Question',
            details: '',
            required: false,
            validation: null,
            answer: ''
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneLineAnswer index={0} enableEdit={true} />
                            </Provider>);
    
    component.find(OneLineAnswer).simulate("doubleclick");
    expect(component.find(OneLineAnswer).find('#question').exists()).toBeTruthy();
    expect(component.find(OneLineAnswer).find('#required').exists()).toBeTruthy();
    expect(component.find(OneLineAnswer).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(OneLineAnswer).find(ValidationOptions).exists()).toBeTruthy();  
    component.unmount();  
  });
});
