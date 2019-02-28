import './RadioInput.css';
import classNames from 'classnames'; //eslint-disable-line
import PropTypes from 'prop-types';
import React from 'react';

class RadioInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.passwordInput = React.createRef();
  }

  render() {
    const {
      labelBeforeRadioButton, name, radioLabelText, inputId, isDefaultChecked,
      checkBoxClass, inputContainerClassName, value,
    } = this.props;

    return (
      <label htmlFor={inputId} className={inputContainerClassName}>
        {labelBeforeRadioButton && <span>{radioLabelText}</span>}
        <input value={value} type="radio" className="Input-hidden" name={name} id={inputId} defaultChecked={isDefaultChecked} />
        <span className={checkBoxClass} />
        {!labelBeforeRadioButton && <span>{radioLabelText}</span>}
      </label>
    );
  }
}


RadioInput.defaultProps = {
  inputContainerClassName: 'Standard-radio-input-container',
  labelBeforeRadioButton: null,
  name: null,
  radioLabelText: null,
  inputId: null,
  isDefaultChecked: false,
  checkBoxClass: 'Standard-checkbox',
  value: null,
};

RadioInput.propTypes = {
  inputContainerClassName: PropTypes.string,
  labelBeforeRadioButton: PropTypes.bool,
  name: PropTypes.string,
  radioLabelText: PropTypes.string,
  inputId: PropTypes.string,
  isDefaultChecked: PropTypes.bool,
  checkBoxClass: PropTypes.string,
  value: PropTypes.number,
};


export default RadioInput;
