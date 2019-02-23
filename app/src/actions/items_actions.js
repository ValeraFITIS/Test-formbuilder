import * as actions from './action_types';
import * as types from '../components/item_types';

export function validateComponent(index, component) {
  return (dispatch) => {
    let err = false;

    dispatch(itemError(index, false));

    if(component.data.question.length == 0) {
      dispatch(itemError(index, true, 'Question cann\'t be blank'));
      err = true;
    }

    if(component.data.options) {
      for(let id = 0; id < component.data.options.length; id++) {
        if(component.data.options[id].length == 0) {
          dispatch(itemError(index, true, 'Option cann\'t be blank'));
          err = true;
          break;
        }
      }
    }

    if(!err) {
      dispatch(itemUpdate(index, component));
      dispatch(itemEdit(index, false));
    }
  };
}

export function initItem(index, component) {
  return (dispatch) => {
    let initialComponent = {
      type: component.type,
      data: {
        question: '',
        details: '',
        required: null,
        validation: null,
        options: null,
        answer: null,
      },
    };

    switch (component.type) {
      case types.ONE_LINE_ANSWER_TYPE:
      case types.MULTIPLE_LINES_ANSWER_TYPE: {
        initialComponent.data = {...initialComponent.data,
          required: false,
          validation: null,
          answer: '',
        };
        break;
      }
      case types.ONE_ANSWER_FROM_LIST_TYPE:
      case types.MULTIPLE_ANSWERS_FROM_LIST_TYPE: {
        initialComponent.data = {...initialComponent.data,
          required: false,
          options: [
            '',
          ],
          answer: [
          ],
        };
        break;
      }

      case types.HEADER_TYPE:
      case types.TITLE_TYPE: {
        break;
      }

      default:
        dispatch(itemError(true));
    }

    dispatch(itemUpdate(index, initialComponent));
  };
}

export function removeItem(id) {
  return {
    type: actions.REMOVE_ITEM,
    id,
  };
}

export function itemUpdate(id, component) {
  return {
    type: actions.SAVE_ITEM,
    component,
    id,
  };
}

export function itemsSave(items) {
  return {
    type: actions.SAVE_ITEMS,
    items,
  };
}

export function moveUpItem(id) {
  return {
    type: actions.ITEM_UP,
    id,
  };
}

export function moveDownItem(id) {
  return {
    type: actions.ITEM_DOWN,
    id,
  };
}

export function addNewItem(item) {
  return {
    type: actions.ADD_NEW_ITEM,
    item,
  };
}

export function itemError(id, bool, errMsg = '') {
  return {
    type: actions.ITEM_ERROR,
    error: bool,
    errMsg,
    id,
  };
}

export function itemEdit(id, bool) {
  return {
    type: actions.ITEM_EDIT,
    edit: bool,
    id,
  };
}
