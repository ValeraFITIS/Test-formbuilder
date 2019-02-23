import React from 'react';
import { mount } from 'enzyme';
import ValidationOptions from '../components/validation_options_component';
import * as validationTypes from '../components/validation_types';


describe('Validation options component', () => {
  it('render without default', () => {
    const callback  = jest.fn(type => expect(type).toBe(null));
    const component = mount(<ValidationOptions callback={callback}/>);
    
    expect(component.find('div#validation_options').exists()).toBeTruthy();
    component.find('#validator').simulate('change');
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });

  it('render with default', () => {
    const default_state = {
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_EMAIL_PATTERN,
      notice: 'validation error',
      options: {
        param1: '',
        param2: '',
      }
    };
    const callback  = jest.fn(new_state => expect(JSON.stringify(new_state)).toBe(JSON.stringify(default_state)));
    const component = mount(<ValidationOptions callback={callback} default={default_state} />);
    component.find('#pattern').simulate('change');
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });

  it('set text validator type', () => {
    const callback  = jest.fn(new_state => {
      expect(new_state.validator).toBe(validationTypes.TEXT_VALIDATOR_TYPE);
      expect(new_state.pattern).toBe(validationTypes.TEXT_INCLUDE_PATTERN);
    });
    const component = mount(<ValidationOptions callback={callback} />);
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });

  it('set number validator type', () => {
    const callback  = jest.fn(new_state => {
      expect(new_state.validator).toBe(validationTypes.NUMBER_VALIDATOR_TYPE);
      expect(new_state.pattern).toBe(validationTypes.NUMBER_EQUAL_PATTERN);
    });
    const component = mount(<ValidationOptions callback={callback} />);
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });

  it('set include validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_INCLUDE_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: 'some text', id: 'param1'}}); 
    
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_INCLUDE_PATTERN,
      notice: '',
      options: {
        param1: 'some text',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set exclude validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_EXCLUDE_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: 'some text', id: 'param1'}}); 
    
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_EXCLUDE_PATTERN,
      notice: '',
      options: {
        param1: 'some text',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set email validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_EMAIL_PATTERN}}); 
    
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_EMAIL_PATTERN,
      notice: '',
      options: {
        param1: '',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set url validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_URL_PATTERN}}); 
    
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_URL_PATTERN,
      notice: '',
      options: {
        param1: '',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set date validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_DATE_PATTERN}}); 
    
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.results[1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_DATE_PATTERN,
      notice: '',
      options: {
        param1: '',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set time validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_TIME_PATTERN}}); 
    
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_TIME_PATTERN,
      notice: '',
      options: {
        param1: '',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set datetime validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.TEXT_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.TEXT_DATE_TIME_PATTERN}}); 
    
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.TEXT_VALIDATOR_TYPE,
      pattern: validationTypes.TEXT_DATE_TIME_PATTERN,
      notice: '',
      options: {
        param1: '',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set equal validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_EQUAL_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: '5', id: 'param1'}}); 
    
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_EQUAL_PATTERN,
      notice: '',
      options: {
        param1: '5',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set not equal validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_NOT_EQUAL_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: '5', id: 'param1'}}); 
    
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_NOT_EQUAL_PATTERN,
      notice: '',
      options: {
        param1: '5',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set integer validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_INTEGER_PATTERN}}); 
    
    expect(callback.mock.calls.length).toBe(2);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_INTEGER_PATTERN,
      notice: '',
      options: {
        param1: '',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set between validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_BETWEEN_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: '5', id: 'param1'}}); 
    component.find('#param2').simulate('change', {target: {value: '10', id: 'param2'}}); 
    
    expect(callback.mock.calls.length).toBe(4);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_BETWEEN_PATTERN,
      notice: '',
      options: {
        param1: '5',
        param2: '10',
      }
    }));
    
    component.unmount();
  });

  it('set not between validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_NOT_BETWEEN_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: '5', id: 'param1'}}); 
    component.find('#param2').simulate('change', {target: {value: '10', id: 'param2'}}); 
    
    expect(callback.mock.calls.length).toBe(4);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_NOT_BETWEEN_PATTERN,
      notice: '',
      options: {
        param1: '5',
        param2: '10',
      }
    }));
    
    component.unmount();
  });

  it('set less or equal validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_LESS_OR_EQUAL_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: '5', id: 'param1'}}); 
    
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_LESS_OR_EQUAL_PATTERN,
      notice: '',
      options: {
        param1: '5',
        param2: '',
      }
    }));
    
    component.unmount();
  });

  it('set greater or equal validation pattern', () => {
    const callback  = jest.fn(state => JSON.stringify(state));
    const component = mount(<ValidationOptions callback={callback} />);
    
    component.find('#validator').simulate('change', {target: {value: validationTypes.NUMBER_VALIDATOR_TYPE}});
    component.find('#pattern').simulate('change', {target: {value: validationTypes.NUMBER_GREATER_OR_EQUAL_PATTERN}}); 
    component.find('#param1').simulate('change', {target: {value: '5', id: 'param1'}}); 
    
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.results[callback.mock.calls.length - 1].value).toBe(JSON.stringify({
      validator: validationTypes.NUMBER_VALIDATOR_TYPE,
      pattern: validationTypes.NUMBER_GREATER_OR_EQUAL_PATTERN,
      notice: '',
      options: {
        param1: '5',
        param2: '',
      }
    }));
    
    component.unmount();
  });
});
