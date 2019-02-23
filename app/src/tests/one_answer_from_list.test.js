import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import OneAnswerFromList from '../components/one_answer_from_list_component';
import TypeSelector from '../components/type_selector_component'; 
import configureStore from '../store/configureStore';
import * as types from '../components/item_types';


describe('One answer from list component', () => {
  it('render in edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_ANSWER_FROM_LIST_TYPE,
          data: {
            question: '',
            details: '',
            required: false,
            options: ['']
          }
        },
        edit: true,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneAnswerFromList index={0}/>
                            </Provider>);
    
    expect(component.find(OneAnswerFromList).find('#question').exists()).toBeTruthy();
    expect(component.find(OneAnswerFromList).find('#required').exists()).toBeTruthy();
    expect(component.find(OneAnswerFromList).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(OneAnswerFromList).find('#answer_0').exists()).toBeTruthy();  
    expect(component.find(OneAnswerFromList).find('#add_answer').exists()).toBeTruthy();
    component.unmount();  
  });

  it('render in preview mode', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_ANSWER_FROM_LIST_TYPE,
          data: {
            question: 'Some question',
            details: '',
            options:['1', '2', '3']
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneAnswerFromList index={0}/>
                            </Provider>);
    
    expect(component.find(OneAnswerFromList).find('#answer_0').exists()).toBeTruthy();
    expect(component.text()).toContain('Some question');
    state.items[0].component.data.options.forEach((option) => expect(component.text()).toContain(option));
    
    component.unmount();  
  });

  it('save after edit', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_ANSWER_FROM_LIST_TYPE,
          data: {
            question: '',
            details: '',
            required: false,
            options:['']
          }
        },
        edit: true,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneAnswerFromList index={0} enableEdit={true} />
                            </Provider>);

    component.find(OneAnswerFromList).find('#question').simulate('change', {target: {value: 'my question'}});
    component.find(OneAnswerFromList).find('#details').simulate('change', {target: {value: 'some details'}});
    component.find(OneAnswerFromList).find('#answer_0').simulate('change', {target: {value: 'some option'}});
    component.find(OneAnswerFromList).find('#required').simulate('change', {target: {checked: true}});
    component.find(OneAnswerFromList).simulate('doubleclick');
    expect(component.text()).toContain('my question (*Required field)');
    expect(component.text()).toContain('some details');
    expect(component.text()).toContain('some option');
    
    component.unmount();  
  });

  it('switch to edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.ONE_ANSWER_FROM_LIST_TYPE,
          data: {
            question: 'Question',
            details: '',
            required: false,
            options:['1']
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <OneAnswerFromList index={0} enableEdit={true} />
                            </Provider>);
    
    component.find(OneAnswerFromList).simulate("doubleclick");
    expect(component.find(OneAnswerFromList).find('#question').exists()).toBeTruthy();
    expect(component.find(OneAnswerFromList).find('#required').exists()).toBeTruthy();
    expect(component.find(OneAnswerFromList).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(OneAnswerFromList).find('#answer_0').exists()).toBeTruthy();  
    expect(component.find(OneAnswerFromList).find('#add_answer').exists()).toBeTruthy();
    component.unmount();  
  });
});
