import * as actions from '../actions/action_types';

const initialState = {
  loaded: false,
  error: false,
  submited: false,
  isLoading: false,
  errMsg: {},
};

export function formReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FORM_BUILD_SUCCESS: {
      return {
        ...state,
        loaded: action.loaded,
      };
    }

    case actions.FORM_BUILD_ERROR: {
      return {
        ...state,
        error: action.error,
        errMsg: (action.error) ? {
          ...state.errMsg,
          [action.id]: action.errMsg,
        } : {},
      };
    }

    case actions.FORM_SUBMITED: {
      return {
        ...state,
        submited: action.submited,
      };
    }

    case actions.FORM_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }

    default:
      return state;
  }
}
