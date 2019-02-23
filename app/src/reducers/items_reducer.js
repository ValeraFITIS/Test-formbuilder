import * as actions from '../actions/action_types';

const initialState = [
];

export function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SAVE_ITEM: {
      let newItems = state.slice();
      newItems[action.id].component = action.component;

      return newItems;
    }

    case actions.SAVE_ITEMS: {
      return action.items;
    }

    case actions.ADD_NEW_ITEM: {
      return [
        ...state,
        action.item,
      ];
    }

    case actions.REMOVE_ITEM: {
      return state.filter((_, index) => index != action.id);
    }

    case actions.ITEM_UP: {
      let newItems = state.slice();
      if(action.id != 1) {
        let tmp = newItems[action.id - 1];
        newItems[action.id - 1] = newItems[action.id];
        newItems[action.id] = tmp;
      }

      return newItems;
    }

    case actions.ITEM_DOWN: {
      let newItems = state.slice();
      if(action.id != (newItems.length - 1)) {
        let tmp = newItems[action.id + 1];
        newItems[action.id + 1] = newItems[action.id];
        newItems[action.id] = tmp;
      }

      return newItems;
    }

    case actions.ITEM_ERROR: {
      let newItems = state.slice();
      newItems[action.id].error = action.error;
      newItems[action.id].errMsg = (action.error) ? [
        ...newItems[action.id].errMsg,
        action.errMsg,
      ] : [
      ];

      return newItems;
    }

    case actions.ITEM_EDIT: {
      let newItems = state.slice();
      newItems[action.id].edit = action.edit;

      return newItems;
    }

    default:
      return state;
  }
}
