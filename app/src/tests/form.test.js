import React from 'react';
import { mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mock from 'redux-mock-store';
import Form from '../components/form_component';
import Header from '../components/header_component';
import Title from '../components/title_component';
import OneLineAnswer from '../components/one_line_answer_component';
import configureStore from '../store/configureStore';
import { formReducer } from '../reducers/form_reducer';

import * as types from '../components/item_types';
import * as action_types from '../actions/action_types';
import * as actions from '../actions/form_actions';

const config = {
  mountId: '',
  isEditable: true,
  endpoint: {
    url: '',
    options: {},
  },
  serializers: {
    input: null,
    output: null,
  },
};

describe('Form component', () => {
  it('render with default state', () => {

    const local_store = configureStore();
    const component   = mount(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    expect(component.text()).toContain('Title:');
    component.unmount();
  });

  it('render with error state', () => {
    
    const state = {
      form: {
        loaded: false,
        error: true,
        submited: false,
        errMsg: {
          form: ['Test error']
        }
      }
    };
    const local_store = configureStore(state);
    const component   = render(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    expect(component.text()).toContain(state.form.errMsg.form);
  });

  it('render with loaded state', () => {

    const state = {
      form: {
        loaded: true,
        error: false,
        submited: false,
        errMsg: {}
      },
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: 'Some header',
            details: ''
          }
        }
      }]
    };
    const local_store = configureStore(state);
    const component   = render(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    expect(component.text()).toContain('Form loaded');
  });

  it('render in preview mode', () => {

    const state = {
      form: {
        loaded: false,
        error: false,
        submited: false,
        errMsg: {}
      },
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: 'Some header',
            details: ''
          }
        }
      }]
    };
    const local_store = configureStore(state);
    const component   = mount(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    expect(component.find(Form).contains(Header)).toBeTruthy();
    component.unmount();
  });

  it('render in JSON view', () => {

    const state = {
      form: {
        loaded: false,
        error: false,
        submited: true,
        errMsg: {}
      },
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: 'Some header',
            details: ''
          }
        }
      }]
    };
    const local_store = configureStore(state);
    const component   = render(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    expect(component.text()).toContain(JSON.stringify(state.items[0].component));
  });

  it('submit form', () => {

    const state = {
      form: {
        loaded: false,
        error: false,
        submited: false,
        errMsg: {}
      },
      items: [{
        component: {
          type: types.HEADER_TYPE,
          data: {
            question: 'Some header',
            details: ''
          }
        }
      }]
    };
    const local_store = configureStore(state);
    const component   = mount(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    expect(component.find(Form).contains(Header)).toBeTruthy();
    component.find(Form).simulate('submit');
    expect(component.text()).toContain(JSON.stringify(state.items[0].component));
    component.unmount();
  });

  it('add component button click', () => {

    const state = {
      form: {
        loaded: false,
        error: false,
        submited: false,
        errMsg: []
      },
      items: []
    };
    const local_store = configureStore(state);
    const component   = mount(<Provider store={ local_store } >
                                <Form {...config} />
                              </Provider>);
    const add_btn = component.find(Form).first().find('#add_btn').first();
    
    add_btn.simulate('click');
    
    expect(component.find(Form).first().contains(Title)).toBeTruthy();
    expect(component.find(Form).first().contains(OneLineAnswer)).toBeTruthy();
    component.unmount();
  });
});

describe('Form actions', () => {
  let initialState = {
    form: {
      loaded: false,
      error: false,
      submited: false,
      errMsg: []
    }    
  };
  
  let middlewares = [thunk]
  let mockStore   = mock(middlewares);
  let store       = mockStore(initialState);
  
  beforeEach(() => {
    store.clearActions();
  });

  it('formBuildSuccess', () => {

    const expectedActions = [
      {
        loaded: true,
        type: action_types.FORM_BUILD_SUCCESS
      },
    ];

    store.dispatch(actions.formBuildSuccess(true));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('formBuildError', () => {

    const expectedActions = [
      {
        error: true,
        errMsg: 'Some error msg',
        id: 'form',
        type: action_types.FORM_BUILD_ERROR
      },
    ];

    store.dispatch(actions.formBuildError(true, 'Some error msg'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('formSubmited', () => {

    const expectedActions = [
      {
        submited: true,
        type: action_types.FORM_SUBMITED
      },
    ];

    store.dispatch(actions.formSubmited(true));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Form reducer', () => {
  it('initial', () => {
    
    const action = { type: 'inexistent_type' };
    const initialState = {
      loaded: false,
      error: false,
      submited: false,
      isLoading: false,
      errMsg: {}
    };

    expect(formReducer(undefined, action)).toEqual(initialState);
  });

  it('loaded', () => {

    const action = { 
      type: action_types.FORM_BUILD_SUCCESS,
      loaded: true 
    };

    const expectedState = {
      loaded: true,
      error: false,
      submited: false,
      isLoading: false,
      errMsg: {}
    };

    expect(formReducer(undefined, action)).toEqual(expectedState);
  });

  it('error', () => {

    const action = { 
      type: action_types.FORM_BUILD_ERROR,
      error: true,
      id: 'form',
      errMsg: 'Error' 
    };

    const prevState = {
      loaded: false,
      error: false,
      submited: false,
      isLoading: false,
      errMsg: {'form': 'Prev error'}
    }

    const expectedState = {
      loaded: false,
      error: true,
      submited: false,
      isLoading: false,
      errMsg: {'form':'Error'}
    };

    expect(formReducer(prevState, action)).toEqual(expectedState);
  });

  it('submited', () => {

    const action = { 
      type: action_types.FORM_SUBMITED,
      submited: true 
    };

    const expectedState = {
      loaded: false,
      error: false,
      submited: true,
      isLoading: false,
      errMsg: {}
    };

    expect(formReducer(undefined, action)).toEqual(expectedState);
  });
});
