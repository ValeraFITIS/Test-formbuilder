import React, {Component} from 'react';
import {connect} from 'react-redux';
import {submitForm, formSubmited, formLoad} from '../actions/form_actions';
import {addNewItem, itemsSave} from '../actions/items_actions';
import OneLineAnswer from './one_line_answer_component';
import MultipleLinesAnswer from './multiple_lines_answer_component';
import MultipleAnswersFromList from './multiple_answers_from_list_component';
import OneAnswerFromList from './one_answer_from_list_component';
import Header from './header_component';
import Title from './title_component';

import * as types from '../components/item_types';

class Form extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.inputSerializer = this.inputSerializer.bind(this);
    this.outputSerializer = this.outputSerializer.bind(this);
  }

  submit() {
    this.props.submitForm(this.props.items,
        this.props.endpoint.url,
        this.props.endpoint.options,
        this.outputSerializer);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.submit();
  }

  renderItem(item, index) {
    let content;

    switch (item.component.type) {
      case types.ONE_LINE_ANSWER_TYPE: {
        content = <OneLineAnswer index={index} enableEdit={this.props.isEditable} />;
        break;
      }
      case types.MULTIPLE_ANSWERS_FROM_LIST_TYPE: {
        content = <MultipleAnswersFromList index={index} enableEdit={this.props.isEditable} />;
        break;
      }
      case types.MULTIPLE_LINES_ANSWER_TYPE: {
        content = <MultipleLinesAnswer index={index} enableEdit={this.props.isEditable} />;
        break;
      }
      case types.ONE_ANSWER_FROM_LIST_TYPE: {
        content = <OneAnswerFromList index={index} enableEdit={this.props.isEditable} />;
        break;
      }
      case types.HEADER_TYPE: {
        content = <Header index={index} enableEdit={this.props.isEditable} />;
        break;
      }
      case types.TITLE_TYPE: {
        content = <Title index={index} enableEdit={this.props.isEditable} />;
        break;
      }
    }

    return (
      <div id = {'question_' + index} key = {index} >
        {this.props.errMsg[index] && <p style={{color: 'red'}}>{this.props.errMsg[index]}</p>}
        {content}
      </div>
    );
  }

  inputSerializer(items) {
    if(this.props.serializers.input) {
      let serializerdItems = this.props.serializers.input(items);
      this.props.addNewItems(serializerdItems);
    }else{
      this.props.addNewItems(items);
    }
  }

  outputSerializer(items) {
    if(this.props.serializers.output) {
      return this.props.serializers.output(items);
    }else{
      return JSON.stringify(items);
    }
  }

  addItem() {
    const item = {
      component: {
        type: types.ONE_LINE_ANSWER_TYPE,
        data: {},
      },
      edit: true,
      error: false,
      errMsg: [
      ],
    };
    this.props.addNewItem(item);
  }

  componentDidMount() {
    if(this.props.endpoint.url) {
      this.props.loadForm(this.props.endpoint.url, this.props.endpoint.options, this.inputSerializer);
    }
    if(!this.props.items.length) {
      const item = {
        component: {
          type: types.TITLE_TYPE,
          data: {},
        },
        edit: true,
        error: false,
        errMsg: [
        ],
      };
      this.props.addNewItem(item);
    }
  }

  render() {
    let msg;

    if(this.props.isLoading) {
      return (<div id="main_frame">
        <p>Please wait, the form is loading...</p>
      </div>
      );
    }

    if(this.props.errMsg['form']) {
      return (<form id="main_frame">
        <p style={{color: 'red'}}>{this.props.errMsg['form']}</p>
      </form>
      );
    }

    if(this.props.submited) {
      msg = <p style={{color: 'green'}}>Form saved</p>;
      if(!this.props.endpoint.url) {
        return (<form id="main_frame">
          {msg}
          <p>
            {
              this.props.serializers.output ? this.props.serializers.output(this.props.items.map((item) => item.component))
              : JSON.stringify(this.props.items.map((item) => item.component))
            }
          </p>
          <div id='control_panel'>
            <input type="button" value="Back to form" onClick={this.props.resetSubmitStatus} />
          </div>
        </form>
        );
      }
    }

    if(this.props.loaded) {
      msg = <p style={{color: 'green'}}>Form loaded</p>;
    }

    return (<form name="main_frame" onSubmit={this.handleSubmit} >
      {msg}
      {this.props.isEditable
        && <input type="button" id="add_btn" value="Add component" onClick={this.addItem} />
      }
      {this.props.items.map((item, index) => this.renderItem(item, index))}
      <input type="submit" value="Submit" />
    </form>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    items: state.items,
    isLoading: state.form.isLoading,
    loaded: state.form.loaded,
    error: state.form.error,
    errMsg: state.form.errMsg,
    submited: state.form.submited,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (items, url, options, callback) => dispatch(submitForm(items, url, options, callback)),
    resetSubmitStatus: () => dispatch(formSubmited(false)),
    addNewItem: (item) => dispatch(addNewItem(item)),
    loadForm: (url, options, callback) => dispatch(formLoad(url, options, callback)),
    addNewItems: (items) => dispatch(itemsSave(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
