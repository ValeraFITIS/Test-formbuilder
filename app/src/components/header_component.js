import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initItem, validateComponent, itemEdit, moveUpItem, moveDownItem, removeItem, itemUpdate} from '../actions/items_actions';
import TypeSelector from './type_selector_component';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};

    this.saveToProps = this.saveToProps.bind(this);
    this.switchEdit = this.switchEdit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.changeType = this.changeType.bind(this);
    this.hanbleQuestionInput = this.hanbleQuestionInput.bind(this);
    this.hanbleDetailsInput = this.hanbleDetailsInput.bind(this);
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

  componentDidMount() {
    if(!Object.keys(this.state.component.data).length) {
      this.state.create(this.state.index, this.state.component);
    }else{
      let newState = this.state;
      newState.component.data.options = null;
      newState.component.data.answer = null;
      newState.component.data.validation = null;
      newState.component.data.required = null;

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
        Question:<input type='text' id='title'
          placeholder='Write your title'
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
      </div>
      );
    }else{
      return (
        <div onDoubleClick={this.switchEdit} >
          <h2 align="center">{content.question}</h2>
          {
            content.details.length > 0
            && <p align="center">{content.details}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
