import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MultipleAnswersFromList from '../components/multiple_answers_from_list_component';
import TypeSelector from '../components/type_selector_component'; 
import configureStore from '../store/configureStore';
import * as types from '../components/item_types';


describe('Multiple answers from list component', () => {
  it('render in edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_ANSWERS_FROM_LIST_TYPE,
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
                              <MultipleAnswersFromList index={0}/>
                            </Provider>);
    
    expect(component.find(MultipleAnswersFromList).find('#question').exists()).toBeTruthy();
    expect(component.find(MultipleAnswersFromList).find('#required').exists()).toBeTruthy();
    expect(component.find(MultipleAnswersFromList).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(MultipleAnswersFromList).find('#answer_0').exists()).toBeTruthy();  
    expect(component.find(MultipleAnswersFromList).find('#add_answer').exists()).toBeTruthy();
    component.unmount();  
  });

  it('render in preview mode', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_ANSWERS_FROM_LIST_TYPE,
          data: {
            question: 'Some question',
            details: '',
            options:['1', '2', '3'],
            answer: []
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <MultipleAnswersFromList index={0}/>
                            </Provider>);
    
    expect(component.text()).toContain('Some question');
    state.items[0].component.data.options.forEach((option, index) => {
      expect(component.find(MultipleAnswersFromList).find('#answer_' + index).exists()).toBeTruthy();
      expect(component.text()).toContain(option);
    });
    
    component.unmount();  
  });

  it('save after edit', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_ANSWERS_FROM_LIST_TYPE,
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
                              <MultipleAnswersFromList index={0} enableEdit={true} />
                            </Provider>);
    component.find(MultipleAnswersFromList).find('#question').simulate('change', {target: {value: 'my question'}});
    component.find(MultipleAnswersFromList).find('#details').simulate('change', {target: {value: 'some details'}});
    component.find(MultipleAnswersFromList).find('#answer_0').simulate('change', {target: {value: 'some option'}});
    component.find(MultipleAnswersFromList).find('#required').simulate('change', {target: {checked: true}});
    component.find(MultipleAnswersFromList).simulate('doubleclick');
    expect(component.text()).toContain('my question (*Required field)');
    expect(component.text()).toContain('some details');
    expect(component.text()).toContain('some option');
    
    component.unmount();  
  });

  it('switch to edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.MULTIPLE_ANSWERS_FROM_LIST_TYPE,
          data: {
            question: 'Question',
            details: '',
            required: false,
            options:['1'],
            answer: []
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <MultipleAnswersFromList index={0} enableEdit={true} />
                            </Provider>);
    
    component.find(MultipleAnswersFromList).simulate("doubleclick");
    expect(component.find(MultipleAnswersFromList).find('#question').exists()).toBeTruthy();
    expect(component.find(MultipleAnswersFromList).find('#required').exists()).toBeTruthy();
    expect(component.find(MultipleAnswersFromList).find(TypeSelector).exists()).toBeTruthy();
    expect(component.find(MultipleAnswersFromList).find('#answer_0').exists()).toBeTruthy();  
    expect(component.find(MultipleAnswersFromList).find('#add_answer').exists()).toBeTruthy();
    component.unmount();  
  });
});
