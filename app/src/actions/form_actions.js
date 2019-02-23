import * as actions from './action_types.js';
import {validate} from '../components/validation_types';

function sendRequest(url, options, timeout = 10000, errMsg = 'Fetching timeout') {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      throw errMsg;
    }, timeout);

    fetch(url, options)
        .then((response) => {
          clearTimeout(timer);
          if(!response.ok) {
            if(response.redirected) {
              window.location.replace(response.url);
            }else{
              reject(response.statusText);
            }
          }

          return response;
        })
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err);
        });
  });
}


export function formLoad(url, options, callback) {
  return (dispatch) => {
    dispatch(formBuildSuccess(false));
    dispatch(formIsLoading(true));

    sendRequest(url, options)
        .then((response) => response.json())
        .then((items) => {
          if(callback) {
            callback(items);
          }
          dispatch(formIsLoading(false));
          dispatch(formBuildSuccess(true));
          setTimeout(() => dispatch(formBuildSuccess(false)), 5000);
        })
        .catch((err) => {
          dispatch(formIsLoading(false));
          dispatch(formBuildError(true, 'Can\'t load this form. Error: ' + err));
        });
  };
}

export function submitForm(items, url, options, callback) {
  return (dispatch) => {
    let error = false;

    dispatch(formBuildError(false));
    dispatch(formSubmited(false));

    items.forEach((item, index) => {
      if(item.edit) {
        dispatch(formBuildError(true, 'This item in edit mode', index));
        error = true;
      }
    });

    if(error) {
      return;
    }

    const nodes = items.map((item) => item.component);
    nodes.forEach((component, index) => {
      if(component.data.required && !component.data.answer.length) {
        dispatch(formBuildError(true, 'Answer is required!', index));
        error = true;
      }

      if(component.data.validation && component.data.answer.length) {
        if(!validate(component.data.validation.pattern, component.data.answer, component.data.validation.options)) {
          dispatch(formBuildError(true, component.data.validation.notice, index));
          error = true;
        }
      }
    });


    if(!error) {
      if(url) {
        const [
          serializedItems,
          type,
        ] = callback(items);

        sendRequest(url, {...options,
          'method': 'PUT',
          'headers': (type) ? {...options.headers, 'Content-Type': type} : options.headers,
          'body': serializedItems})
            .then(() => {
              dispatch(formSubmited(true));
            })
            .catch((err) => {
              dispatch(formBuildError(true, 'Can\'t submit this form. Error: ' + err));
            });
      }else{
        dispatch(formSubmited(true));
      }
    }
  };
}

export function formBuildSuccess(bool) {
  return {
    type: actions.FORM_BUILD_SUCCESS,
    loaded: bool,
  };
}

export function formBuildError(bool, errMsg = '', id = 'form') {
  return {
    type: actions.FORM_BUILD_ERROR,
    error: bool,
    errMsg,
    id,
  };
}

export function formIsLoading(bool) {
  return {
    type: actions.FORM_LOADING,
    isLoading: bool,
  };
}

export function formSubmited(bool) {
  return {
    type: actions.FORM_SUBMITED,
    submited: bool,
  };
}
