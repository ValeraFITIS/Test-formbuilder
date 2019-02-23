import React, {Component} from 'react';
import * as validationTypes from './validation_types';

class ValidationOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validator: validationTypes.NO_VALIDATOR_TYPE,
      pattern: '',
      notice: '',
      options: {
        param1: '',
        param2: '',
      },
    };

    this.handleValidatorSelection = this.handleValidatorSelection.bind(this);
    this.handlePatternSelection = this.handlePatternSelection.bind(this);
    this.handleNoticeInput = this.handleNoticeInput.bind(this);
    this.handleOptionsInput = this.handleOptionsInput.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    if(this.props.default) {
      this.setState({...this.props.default});
    }
  }

  update() {
    if(this.state.validator != validationTypes.NO_VALIDATOR_TYPE) {
      this.props.callback({...this.state});
    }else{
      this.props.callback(null);
    }
  }

  handleValidatorSelection = (e) => {
    let pattern = '';

    switch (e.target.value) {
      case validationTypes.TEXT_VALIDATOR_TYPE: {
        pattern = validationTypes.TEXT_INCLUDE_PATTERN;
        break;
      }
      case validationTypes.NUMBER_VALIDATOR_TYPE: {
        pattern = validationTypes.NUMBER_EQUAL_PATTERN;
        break;
      }
    }
    this.setState({validator: e.target.value, pattern}, this.update);
  }

  handlePatternSelection = (e) => {
    this.setState({pattern: e.target.value, options: {param1: '', param2: ''}}, this.update);
  }

  handleNoticeInput(e) {
    this.setState({notice: e.target.value}, this.update);
  }

  handleOptionsInput(e) {
    this.setState({options: {...this.state.options, [e.target.id]: e.target.value}}, this.update);
  }

  render() {
    const validatorSelector = (
      <p>
        Validator type: <select id="validator"
          value={this.state.validator}
          onChange={this.handleValidatorSelection} >
          <option value={validationTypes.NO_VALIDATOR_TYPE}>None</option>
          <option value={validationTypes.TEXT_VALIDATOR_TYPE}>Text</option>
          <option value={validationTypes.NUMBER_VALIDATOR_TYPE}>Number</option>
        </select>
      </p>
    );

    if(this.state.validator == validationTypes.NO_VALIDATOR_TYPE) {
      return (
        <div id='validation_options'>
          {validatorSelector}
        </div>
      );
    }

    let patternSelector;
    let options;
    switch (this.state.validator) {
      case validationTypes.TEXT_VALIDATOR_TYPE: {
        patternSelector = (
          <p>
            Pattern: <select id="pattern"
              value={this.state.pattern}
              onChange={this.handlePatternSelection} >
              <option value={validationTypes.TEXT_INCLUDE_PATTERN}>Include text</option>
              <option value={validationTypes.TEXT_EXCLUDE_PATTERN}>Exclude text</option>
              <option value={validationTypes.TEXT_EMAIL_PATTERN}>Email</option>
              <option value={validationTypes.TEXT_URL_PATTERN}>URL</option>
              <option value={validationTypes.TEXT_DATE_PATTERN}>Date</option>
              <option value={validationTypes.TEXT_TIME_PATTERN}>Time</option>
              <option value={validationTypes.TEXT_DATE_TIME_PATTERN}>Date and Time</option>
            </select>
          </p>
        );

        switch (this.state.pattern) {
          case validationTypes.TEXT_INCLUDE_PATTERN:
          case validationTypes.TEXT_EXCLUDE_PATTERN: {
            options = (
              <p>
                Match string:<input type='text' id='param1'
                  placeholder='Write string to search...'
                  value={this.state.options.param1}
                  onChange={this.handleOptionsInput}
                />
              </p>
            );
            break;
          }
        }
        break;
      }
      case validationTypes.NUMBER_VALIDATOR_TYPE: {
        patternSelector = (
          <p>
            Pattern: <select id="pattern"
              value={this.state.pattern}
              onChange={this.handlePatternSelection} >

              <option value={validationTypes.NUMBER_EQUAL_PATTERN}>Equal</option>
              <option value={validationTypes.NUMBER_NOT_EQUAL_PATTERN}>Not equal</option>
              <option value={validationTypes.NUMBER_INTEGER_PATTERN}>Integer number</option>
              <option value={validationTypes.NUMBER_BETWEEN_PATTERN}>Between</option>
              <option value={validationTypes.NUMBER_NOT_BETWEEN_PATTERN}>Not between</option>
              <option value={validationTypes.NUMBER_LESS_OR_EQUAL_PATTERN}>Less than or equal</option>
              <option value={validationTypes.NUMBER_GREATER_OR_EQUAL_PATTERN}>Greater than or equal</option>
            </select>
          </p>
        );

        switch (this.state.pattern) {
          case validationTypes.NUMBER_BETWEEN_PATTERN:
          case validationTypes.NUMBER_NOT_BETWEEN_PATTERN: {
            options = (
              <p>
                Lower value:<input type='text' id='param1'
                  placeholder='Write lower bound..'
                  value={this.state.options.param1}
                  onChange={this.handleOptionsInput}
                /><br/>
                Upper value:<input type='text' id='param2'
                  placeholder='Write upper bound..'
                  value={this.state.options.param2}
                  onChange={this.handleOptionsInput}
                />
              </p>
            );
            break;
          }
          case validationTypes.NUMBER_EQUAL_PATTERN:
          case validationTypes.NUMBER_NOT_EQUAL_PATTERN:
          case validationTypes.NUMBER_LESS_OR_EQUAL_PATTERN:
          case validationTypes.NUMBER_GREATER_OR_EQUAL_PATTERN: {
            options = (
              <p>
                Value:<input type='text' id='param1'
                  placeholder='Write limit value..'
                  value={this.state.options.param1}
                  onChange={this.handleOptionsInput}
                />
              </p>
            );
            break;
          }
        }
        break;
      }
    }

    return (
      <div id='validation_options'>
        {validatorSelector}
        {patternSelector}
        {options}
        Notice:<input type='text' id='notice'
          placeholder='Write an explanatory message'
          value={this.state.notice}
          onChange={this.handleNoticeInput}
        />
      </div>
    );
  }
}

export default ValidationOptions;
