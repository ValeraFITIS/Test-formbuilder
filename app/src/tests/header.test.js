import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Header from '../components/header_component';
import TypeSelector from '../components/type_selector_component'; 
import configureStore from '../store/configureStore';
import * as types from '../components/item_types';


describe('Header component', () => {
  it('render in edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: '',
            details: ''
          }
        },
        edit: true,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <Header index={0}/>
                            </Provider>);
    
    expect(component.find(Header).find('#title').exists()).toBeTruthy();
    expect(component.find(Header).find(TypeSelector).exists()).toBeTruthy();
    component.unmount();  
  });

  it('render in preview mode', () => {
    const state = {
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: 'Some title',
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
                              <Header index={0}/>
                            </Provider>);
    
    expect(component.text()).toContain('Some title');  
    component.unmount();  
  });

  it('save after edit', () => {
    const state = {
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: '',
            details: ''
          }
        },
        edit: true,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <Header index={0} enableEdit={true} />
                            </Provider>);
    component.find(Header).find('#title').simulate('change', {target: {value: 'my title'}});
    component.find(Header).find('#details').simulate('change', {target: {value: 'some details'}});
    component.find(Header).simulate("doubleclick");
    expect(component.text()).toContain('my title');
    expect(component.text()).toContain('some details');
    component.unmount();  
  });

  it('switch to edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: 'Title',
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
                              <Header index={0} enableEdit={true} />
                            </Provider>);
    
    component.find(Header).simulate("doubleclick");
    expect(component.find(Header).find('#title').exists()).toBeTruthy();
    expect(component.find(Header).find(TypeSelector).exists()).toBeTruthy();
    component.unmount();  
  });
});
