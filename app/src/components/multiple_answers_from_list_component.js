import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initItem, validateComponent, itemEdit, moveUpItem, moveDownItem, removeItem, itemUpdate} from '../actions/items_actions';
import TypeSelector from './type_selector_component';

class MultipleAnswersFromList extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};

    this.saveToProps = this.saveToProps.bind(this);
    this.switchEdit = this.switchEdit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.changeType = this.changeType.bind(this);

    this.hanbleAnswerInput = this.hanbleAnswerInput.bind(this);
    this.hanbleAddOption = this.hanbleAddOption.bind(this);
    this.hanbleRemoveOption = this.hanbleRemoveOption.bind(this);
    this.hanbleQuestionInput = this.hanbleQuestionInput.bind(this);
    this.hanbleDetailsInput = this.hanbleDetailsInput.bind(this);
    this.hanbleRequiredInput = this.hanbleRequiredInput.bind(this);
    this.hanbleOptionInput = this.hanbleOptionInput.bind(this);
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

  hanbleAddOption(e) {
    let component = this.state.component;
    component.data.options = [
      ...component.data.options,
      '',
    ];

    this.setState({component}, this.saveToProps);
  }

  hanbleRemoveOption = (id) => (e) => {
    let component = this.state.component;
    component.data.options = component.data.options.filter((_, index) => index != id);

    this.setState({component}, this.saveToProps);
  }

  hanbleAnswerInput(e) {
    let component = this.state.component;
    component.data.answer = e.target.checked ? [
      ...component.data.answer,
      e.target.value,
    ]
    : component.data.answer.filter((value) => value != e.target.value);

    this.setState({component}, () => this.state.validateComponent(this.state.index, this.state.component));
  }

  hanbleOptionInput = (index) => (e) => {
    let component = this.state.component;
    component.data.options[index] = e.target.value;

    this.setState({component}, this.saveToProps);
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
      newState.component.data.validation = null;

      if(!newState.component.data.options) {
        newState.component.data.options = [
          '',
        ];
      }

      if(newState.component.data.answer) {
        newState.component.data.answer = (Array.isArray(newState.component.data.answer))
        ? newState.component.data.answer.filter((answer) => newState.component.data.options.some((option) => option == answer))
        : newState.component.data.options.filter((option) => option == newState.component.data.answer);
      }else{
        newState.component.data.answer = [
        ];
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
        {content.options && content.options.map((answer, index) => (
          <div key={'el_' + index} >
            <label htmlFor={'answer_' + index}>{'Answer #' + (index + 1)}</label>
            <input type='text' id={'answer_' + index}
              placeholder='Write answer option'
              value={answer}
              onChange={this.hanbleOptionInput(index)} />
            {
              content.options.length > 1
              && <input type='button' id={'remove_answer_' + index} value='Remove' onClick={this.hanbleRemoveOption(index)} />
            }
          </div>
        ))}
        <input type='button' id='add_answer' value='Add answer' onClick={this.hanbleAddOption} />

      </div>
      );
    }else{
      return (
        <div onDoubleClick={this.switchEdit} >
          <p>{(content.required) ? (content.question + ' (*Required field)') : content.question }</p>
          {
            content.details.length > 0
            && <p>{content.details}</p>
          }
          {content.options.map((answer, answerId) => (
            <div key = { answerId } >
              <input type="checkbox"
                id={'answer_' + answerId}
                value={answer}
                checked={(content.answer) ? content.answer.some((val) => val == answer) : false}
                onChange={this.hanbleAnswerInput}
              />
              {answer}
            </div>
          ))
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswersFromList);
