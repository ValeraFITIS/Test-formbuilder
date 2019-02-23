import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initItem, validateComponent, itemEdit, moveUpItem, moveDownItem, removeItem, itemUpdate} from '../actions/items_actions';
import ValidationOptions from './validation_options_component';
import TypeSelector from './type_selector_component';


class MultipleLinesAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};

    this.saveToProps = this.saveToProps.bind(this);
    this.switchEdit = this.switchEdit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.changeType = this.changeType.bind(this);
    this.setValidation = this.setValidation.bind(this);
    this.hanbleAnswerInput = this.hanbleAnswerInput.bind(this);
    this.hanbleQuestionInput = this.hanbleQuestionInput.bind(this);
    this.hanbleDetailsInput = this.hanbleDetailsInput.bind(this);
    this.hanbleRequiredInput = this.hanbleRequiredInput.bind(this);
  }

  saveToProps() {
    this.state.update(this.state.index, this.state.component);
  }

  switchEdit() {
    if(!this.state.enableEdit) {
      this.edit.setEdit(this.state.index, false);

      return;
    }

    if(this.state.edit) {
      this.state.validateComponent(this.state.index, this.state.component);
    }else{
      this.state.setEdit(this.state.index, true);
    }
  }

  removeItem() {
    this.state.remove(this.state.index);
  }

  moveUp() {
    this.state.up(this.state.index);
  }

  moveDown() {
    this.state.down(this.state.index);
  }

  changeType(type) {
    const component = {
      ...this.state.component, type,
    };
    this.setState({component}, this.saveToProps);
  }

  setValidation(validation) {
    let component = this.state.component;
    component.data.validation = validation;

    this.setState({component}, this.saveToProps);
  }

  hanbleAnswerInput(e) {
    let component = this.state.component;
    component.data.answer = e.target.value;

    this.setState({component}, () => this.state.validateComponent(this.state.index, this.state.component));
  }

  hanbleQuestionInput(e) {
    let component = this.state.component;
    component.data.question = e.target.value;

    this.setState({component}, this.saveToProps);
  }

  hanbleDetailsInput(e) {
    let component = this.state.component;
    component.data.details = e.target.value;

    this.setState({component}, this.saveToProps);
  }

  hanbleRequiredInput(e) {
    let component = this.state.component;
    component.data.required = e.target.checked;

    this.setState({component}, this.saveToProps);
  }

  componentDidMount() {
    if(!Object.keys(this.state.component.data).length) {
      this.state.create(this.state.index, this.state.component);
    }else{
      let newState = this.state;
      newState.component.data.options = null;

      if(Array.isArray(newState.component.data.answer)) {
        newState.component.data.answer = newState.component.data.answer.toString();
      }
      this.setState({...newState}, this.saveToProps);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    let content = {...this.state.component.data};

    if(this.state.edit) {
      let msg;

      if(this.state.error) {
        msg = this.state.errMsg.map((msg, index) => <p style={{color: 'red'}} key={index}>{msg}</p>);
      }

      return (<div onDoubleClick={this.switchEdit}>
        {msg}
        Type:<TypeSelector callback={this.changeType} default={this.state.component.type} /><br/>
        Question:<input type='text' id='question'
          placeholder='Write your question'
          value={content.question ? content.question : ''}
          onChange={this.hanbleQuestionInput}
        />
        <input type="button" align= 'right' value="Remove" onClick={this.removeItem} />
        <input type="button" align= 'right' value="Up" onClick={this.moveUp} />
        <input type="button" align= 'right' value="Down" onClick={this.moveDown} /><br/>
        Details:<input type='text' id='details'
          placeholder='Write description for this question'
          value={content.details ? content.details : ''}
          onChange={this.hanbleDetailsInput}
        />

        <p>
        Required:
          <input type='checkbox' id='required' checked={content.required ? content.required : false} onChange={this.hanbleRequiredInput} />
        </p>
        <ValidationOptions callback={this.setValidation} default={content.validation} />
      </div>
      );
    }else{
      return (
        <div onDoubleClick={this.switchEdit.bind(this)} >
          <p>{(content.required) ? (content.question + ' (*Required field)') : content.question }</p>
          {
            content.details.length > 0
            && <p>{content.details}</p>
          }
          <textarea rows="4"
            cols="50"
            id="answer"
            value={content.answer ? content.answer : ''}
            onChange={this.hanbleAnswerInput} >
          </textarea>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const item = state.items[ownProps.index];

  return {
    edit: item.edit,
    error: item.error,
    errMsg: item.errMsg,
    component: item.component,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: (index, component) => dispatch(initItem(index, component)),
    validateComponent: (index, component) => dispatch(validateComponent(index, component)),
    update: (index, component) => dispatch(itemUpdate(index, component)),
    setEdit: (index, bool) => dispatch(itemEdit(index, bool)),
    remove: (index) => dispatch(removeItem(index)),
    up: (index) => dispatch(moveUpItem(index)),
    down: (index) => dispatch(moveDownItem(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleLinesAnswer);
