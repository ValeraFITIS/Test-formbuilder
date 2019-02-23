import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initItem, validateComponent, itemEdit, itemUpdate} from '../actions/items_actions';

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};

    this.saveToProps = this.saveToProps.bind(this);
    this.switchEdit = this.switchEdit.bind(this);

    this.hanbleQuestionInput = this.hanbleQuestionInput.bind(this);
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

  hanbleQuestionInput(e) {
    let component = this.state.component;
    component.data.question = e.target.value;

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

  render() {
    let content = {...this.state.component.data};

    if(this.state.edit) {
      let msg;

      if(this.state.error) {
        msg = this.state.errMsg.map((msg, index) => <p style={{color: 'red'}} key={index}>{msg}</p>);
      }

      return (<div onDoubleClick={this.switchEdit}>
        {msg}
        Title:<input type='text' id='title'
          placeholder='Write your title'
          value={content.question ? content.question : ''}
          onChange={this.hanbleQuestionInput}
        />
      </div>
      );
    }else{
      return (
        <div onDoubleClick={this.switchEdit} >
          <h2 align="center">{content.question}</h2>
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
    update: (index, component) => dispatch(itemUpdate(index, component)),
    validateComponent: (index, component) => dispatch(validateComponent(index, component)),
    setEdit: (index, bool) => dispatch(itemEdit(index, bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
