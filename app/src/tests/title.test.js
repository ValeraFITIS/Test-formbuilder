import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Title from '../components/title_component';
import configureStore from '../store/configureStore';
import * as types from '../components/item_types';


describe('Title component', () => {
  it('render in edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.TITLE_TYPE,
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
                              <Title index={0}/>
                            </Provider>);
    
    expect(component.find(Title).find('#title').exists()).toBeTruthy();
    component.unmount();  
  });

  it('render in preview mode', () => {
    const state = {
      items: [{
        component: {
          type: types.TITLE_TYPE,
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
                              <Title index={0}/>
                            </Provider>);
    
    expect(component.text()).toContain('Some title');  
    component.unmount();  
  });

  it('save after edit', () => {
    const state = {
      items: [{
        component: {
          type: types.TITLE_TYPE,
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
                              <Title index={0} enableEdit={true} />
                            </Provider>);
    component.find(Title).find('#title').simulate('change', {target: {value: 'my title'}});
    component.find(Title).simulate("doubleclick");
    expect(component.text()).toContain('my title');
    component.unmount();  
  });

  it('switch to edit mode', () => {
    const state = {
      items: [{
        component: {
          type: types.TITLE_TYPE,
          data: {
            question: 'Title'
          }
        },
        edit: false,
        error: false,
        errMsg: []
      }]
    };
    const store = configureStore(state);
    const component = mount(<Provider store={ store } >
                              <Title index={0} enableEdit={true} />
                            </Provider>);
    
    component.find(Title).simulate("doubleclick");
    expect(component.find(Title).find('#title').exists()).toBeTruthy();
    component.unmount();  
  });
});
