import thunk from 'redux-thunk';
import mock from 'redux-mock-store';
import { itemsReducer } from '../reducers/items_reducer';

import * as types from '../components/item_types';
import * as action_types from '../actions/action_types'; 
import * as actions from '../actions/items_actions';


describe('Items actions', () => {
  let initialState = [];
  let middlewares = [thunk]
  let mockStore   = mock(middlewares);
  let store       = mockStore(initialState);
  
  beforeEach(() => {
    store.clearActions();
  });

  it('itemUpdate', () => {
    const component = {
      type: types.ONE_LINE_ANSWER_TYPE,
      data: {
        question: 'Updated question',
        required: true,
        validation: null,
        answer: ''
      }
    }

    const expectedActions = [
      {
        component,
        id: 1,
        type: action_types.SAVE_ITEM
      },
    ];

    store.dispatch(actions.itemUpdate(1, component));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('removeItem', () => {

    const expectedActions = [
      {
        id: 0,
        type: action_types.REMOVE_ITEM
      },
    ];

    store.dispatch(actions.removeItem(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('itemsSave', () => {

    const expectedActions = [
      {
        items: [],
        type: action_types.SAVE_ITEMS
      },
    ];

    store.dispatch(actions.itemsSave([]));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('moveUpItem', () => {

    const expectedActions = [
      {
        id: 2,
        type: action_types.ITEM_UP
      },
    ];

    store.dispatch(actions.moveUpItem(2));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('moveDownItem', () => {

    const expectedActions = [
      {
        id: 0,
        type: action_types.ITEM_DOWN
      },
    ];

    store.dispatch(actions.moveDownItem(0));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('addNewItem', () => {

    const expectedActions = [
      {
        item:{
          component: {
            type: types.ONE_LINE_ANSWER_TYPE,
            data: {}
          }
        },
        type: action_types.ADD_NEW_ITEM
      },
    ];

    store.dispatch(actions.addNewItem({
          component:{
            type: types.ONE_LINE_ANSWER_TYPE,
            data: {}
          }
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('itemError', () => {

    const expectedActions = [
      {
        id: 2,
        error: true,
        errMsg: 'Error Action',
        type: action_types.ITEM_ERROR
      },
    ];

    store.dispatch(actions.itemError(2, true, 'Error Action'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('itemEdit', () => {

    const expectedActions = [
      {
        id: 2,
        edit: true,
        type: action_types.ITEM_EDIT
      },
    ];

    store.dispatch(actions.itemEdit(2, true));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Items reducer', () => {
  let initialState = [];

  beforeEach(() => {
    initialState = [
      {
        id: 0,
        error: false,
        edit: false,
        errMsg: []
      }, 
      {
        id: 1,
        error: false,
        edit: false,
        errMsg: []
      },
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      }
    ];
  });

  it('initial', () => {
    
    const action = { type: 'inexistent_type' };
    const expectedState = [];

    expect(itemsReducer(undefined, action)).toEqual(expectedState);
  });


  it('add new component', () => {

    const action = { 
      type: action_types.ADD_NEW_ITEM,
      item: {} 
    };

    const expectedState = [...initialState, {}];

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('remove component', () => {

    const action = { 
      type: action_types.REMOVE_ITEM,
      id: 1 
    };

    const expectedState = [{
        id: 0,
        error: false,
        edit: false,
        errMsg: []
      },
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      }
    ];

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('component up', () => {

    const action = { 
      type: action_types.ITEM_UP,
      id: 2 
    };

    const expectedState = [{
        id: 0,
        error: false,
        edit: false,
        errMsg: []
      }, 
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      },
      {
        id: 1,
        error: false,
        edit: false,
        errMsg: []
      }
    ];

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('component down', () => {

    const action = { 
      type: action_types.ITEM_DOWN,
      id: 0 
    };

    const expectedState = [{
        id: 1,
        error: false,
        edit: false,
        errMsg: []
      }, 
      {
        id: 0,
        error: false,
        edit: false,
        errMsg: []
      },
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      }
    ];

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('save component', () => {

    const action = { 
      type: action_types.SAVE_ITEM,
      component: {id:5},
      id: 1 
    };

    const expectedState = [{
        id: 0,
        error: false,
        edit: false,
        errMsg: []
      }, 
      {
        id: 1,
        component: {
          id: 5
        },
        error: false,
        edit: false,
        errMsg: []
      },
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      }
    ];

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('save items', () => {

    const expectedState = [{a:1}, {b:2}, {c:3}];
    const action = { 
      type: action_types.SAVE_ITEMS,
      items: expectedState
    };

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('component error', () => {

    const action = { 
      type: action_types.ITEM_ERROR,
      error: true,
      errMsg: 'Error',
      id: 0
    };
    const expectedState = [{
        id: 0,
        error: true,
        edit: false,
        errMsg: ['Error']
      }, 
      {
        id: 1,
        error: false,
        edit: false,
        errMsg: []
      },
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      }
    ];

    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });

  it('component edit', () => {

    const action = { 
      type: action_types.ITEM_EDIT,
      edit: true,
      id: 1
    };
    const expectedState = [{
        id: 0,
        error: false,
        edit: false,
        errMsg: []
      }, 
      {
        id: 1,
        error: false,
        edit: true,
        errMsg: []
      },
      {
        id: 2,
        error: false,
        edit: false,
        errMsg: []
      }
    ];
    
    expect(itemsReducer(initialState, action)).toEqual(expectedState);
  });
});
