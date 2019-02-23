import React, {Component} from 'react';
import * as types from './item_types';

class TypeSelector extends Component {
  constructor(props) {
    super(props);
    this.type = React.createRef();
  }

  onInput() {
    const type = this.type.current.value;
    this.props.callback(type);
  }
  render() {
    return (
      <select id="item_select" onInput={this.onInput.bind(this)} defaultValue={this.props.default} ref={this.type} >
        <option value={types.ONE_LINE_ANSWER_TYPE}>One line answer</option>
        <option value={types.MULTIPLE_LINES_ANSWER_TYPE}>Multiple lines answer</option>
        <option value={types.ONE_ANSWER_FROM_LIST_TYPE}>One answer from list</option>
        <option value={types.MULTIPLE_ANSWERS_FROM_LIST_TYPE}>Multiple answers from list</option>
        <option value={types.HEADER_TYPE}>Header</option>
      </select>
    );
  }
}

export default TypeSelector;
