import React from 'react';
import { mount } from 'enzyme';
import TypeSelector from '../components/type_selector_component'; 
import * as types from '../components/item_types';


describe('Validation options component', () => {
  it('render without default', () => {
    const callback  = jest.fn(type => expect(type).toBe(types.ONE_LINE_ANSWER_TYPE));
    const component = mount(<TypeSelector callback={callback}/>);
    
    expect(component.find('#item_select').exists()).toBeTruthy();
    component.find('#item_select').simulate('input');
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });

  it('render with default', () => {
    const callback  = jest.fn(type => expect(type).toBe(types.HEADER_TYPE));
    const component = mount(<TypeSelector callback={callback} default={types.HEADER_TYPE} />);
    component.find('#item_select').simulate('input');
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });

  it('select new type', () => {
    const callback  = jest.fn(type => expect(type).toBe(types.MULTIPLE_LINES_ANSWER_TYPE));
    const component = mount(<TypeSelector callback={callback} default={types.HEADER_TYPE} />);
    component.find('#item_select').instance().value = types.MULTIPLE_LINES_ANSWER_TYPE;
    component.find('#item_select').simulate('input');
    expect(callback).toHaveBeenCalled();
    component.unmount();
  });
});
