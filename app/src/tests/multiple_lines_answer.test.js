import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MultipleLinesAnswer from '../components/multiple_lines_answer_component';
import ValidationOptions from '../components/validation_options_component';
import TypeSelector from '../components/type_selector_component'; 
import configureStore from '../store/configureStore';
import * as types from '../components/item_types';


describe('Multiple lines answer component', () => {
  it('render in edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_LINES_ANSWER_TYPE,
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
                              <MultipleLinesAnswer index={0}/>
                            </Provider>);
    
    expect(component.find(MultipleLinesAnswer).find('#question').exists()).toBeTruthy();
    expect(component.find(MultipleLinesAnswer).find('#required').exists()).toBeTruthy();
    expect(component.find(MultipleLinesAnswer).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(MultipleLinesAnswer).find(ValidationOptions).exists()).toBeTruthy();  
    component.unmount();  
  });

  it('render in preview mode', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_LINES_ANSWER_TYPE,
          data: {
            question: 'Some question',
            details: '',
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <MultipleLinesAnswer index={0}/>
                            </Provider>);
    
    expect(component.find(MultipleLinesAnswer).find('#answer').exists()).toBeTruthy();
    expect(component.text()).toContain('Some question');  
    component.unmount();  
  });

  it('save after edit', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_LINES_ANSWER_TYPE,
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
                              <MultipleLinesAnswer index={0} enableEdit={true} />
                            </Provider>);
    component.find(MultipleLinesAnswer).find('#question').simulate('change', {target: {value: 'my question'}});
    component.find(MultipleLinesAnswer).find('#details').simulate('change', {target: {value: 'some details'}});
    component.find(MultipleLinesAnswer).find('#required').simulate('change', {target: {checked: true}});
    component.find(MultipleLinesAnswer).simulate("doubleclick");
    expect(component.text()).toContain('my question (*Required field)');
    expect(component.text()).toContain('some details');
    component.unmount();  
  });

  it('switch to edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_LINES_ANSWER_TYPE,
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
                              <MultipleLinesAnswer index={0} enableEdit={true} />
                            </Provider>);
    
    component.find(MultipleLinesAnswer).simulate("doubleclick");
    expect(component.find(MultipleLinesAnswer).find('#question').exists()).toBeTruthy();
    expect(component.find(MultipleLinesAnswer).find('#required').exists()).toBeTruthy();
    expect(component.find(MultipleLinesAnswer).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(MultipleLinesAnswer).find(ValidationOptions).exists()).toBeTruthy();  
    component.unmount();  
  });
});
