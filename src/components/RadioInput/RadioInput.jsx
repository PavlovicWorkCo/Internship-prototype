import './RadioInput.css';
import classNames from 'classnames'; //eslint-disable-line
import PropTypes from 'prop-types';
import React from 'react';

class RadioInput extends React.PureComponent {
  render() {
    const {
      labelBeforeRadioButton, name, radioLabelText, inputId, isChecked,
      checkBoxClass, inputContainerClassName, value,
    } = this.props;
    return (
      <label htmlFor={inputId} className={inputContainerClassName}>
        {labelBeforeRadioButton && <span>{radioLabelText}</span>}
        <input value={value} type="radio" className="Input-hidden" name={name} id={inputId} checked={isChecked} />
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
  isChecked: false,
  checkBoxClass: 'Standard-checkbox',
  value: null,
};

RadioInput.propTypes = {
  inputContainerClassName: PropTypes.string,
  labelBeforeRadioButton: PropTypes.bool,
  name: PropTypes.string,
  radioLabelText: PropTypes.string,
  inputId: PropTypes.string,
  isChecked: PropTypes.bool,
  checkBoxClass: PropTypes.string,
  value: PropTypes.bool,
};


export default RadioInput;
