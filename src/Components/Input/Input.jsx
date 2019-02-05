import './Input.css';
import PropTypes from 'prop-types';
import React from 'react';
import isValidIcon from '../../../public/icons/isValidInput.svg';
import notValidIcon from '../../../public/icons/notValidInput.svg';
import Validator from '../../helper/Validator';
import togglePasswordIcon from '../../../public/icons/togglePasswordVisibility.svg';

class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    const { inputCheckerType } = this.props;
    this.state = {
      inputWarningText: null,
      inputAcceptable: null,
      inputCheckerType: inputCheckerType, // eslint-disable-line object-shorthand
    };
  }

  setInputValue(value) {
    this.setState({
      inputValue: value,
    });
  }

  inputCheck(inputValue) {
    const { inputCheckerType } = this.state;
    if (inputCheckerType === undefined) return;
    if (inputValue.length === 0) {
      this.setState({
        inputWarningText: null,
        inputAcceptable: null,
      });
      return;
    }
    if (inputCheckerType === 'email') {
      this.validateEmail(inputValue);
    }
    if (inputCheckerType === 'password') {
      this.validatePassword(inputValue);
    }
  }

  validateEmail(email) {
    this.setState({
      inputAcceptable: Validator.validateEmail(email),
      inputWarningText: Validator.validateEmail(email) ? null : 'Please enter a valid email',
    });
    if (!Validator.validateEmail(email)) {
      this.setState({
        inputWarningText: 'email format not valid',
      });
    }
  }

  validatePassword(password) {
    this.setState({
      inputAcceptable: Validator.validatePassword(password),
      inputWarningText: Validator.validatePassword(password) ? null : 'Password must contain at least eight characters, one letter and one number.',
    });
  }

  passwordToggle(e) {
    if (e.target.previousSibling.type === 'text') {
      e.target.previousSibling.type = 'password';
    } else {
      e.target.previousSibling.type = 'text';
    }
  }

  render() {
    const {
      containerClassName,
      inputClassName,
      inputCheckerType,
      inputLabeled,
      inputLabelClassName,
      inputName,
      placeholderText,
      inputType,
      togglePasswordVisibility,
      toggleIconClassName,
    } = this.props;

    const {
      inputValue,
      inputAcceptable,
      inputWarningText,
    } = this.state;
    return (
      <div className={containerClassName}>
        {inputLabeled && inputValue && <p className={inputLabelClassName}>{placeholderText}</p>}
        <div className="Input-inner-container">
          {inputCheckerType && inputAcceptable === true && <img alt="" className="Valid-input-icon" src={isValidIcon} />}
          {inputCheckerType && inputAcceptable === false && <img alt="" className="Not-valid-input-icon" src={notValidIcon} />}
          <input
            type={inputType}
            name={inputName}
            placeholder={placeholderText}
            className={inputClassName}
            onBlur={e => this.inputCheck(e.target.value)}
            onChange={e => this.setInputValue(e.target.value)}
          />
          {togglePasswordVisibility && <img onClick={(e)=> this.passwordToggle(e)} alt="" className={toggleIconClassName} src={togglePasswordIcon} />} {/* eslint-disable-line */}
        </div>
        {inputWarningText && inputAcceptable === false && <p className="Input-warning-text">{inputWarningText}</p>}
      </div>
    );
  }
}

Input.defaultProps = {
  containerClassName: 'Input-big-container',
  inputClassName: null,
  inputCheckerType: null,
  inputLabeled: false,
  inputLabelClassName: null,
  inputName: null,
  placeholderText: null,
  inputType: 'text',
  togglePasswordVisibility: false,
  toggleIconClassName: null,
};

Input.propTypes = {
  containerClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  inputCheckerType: PropTypes.string,
  inputLabeled: PropTypes.bool,
  inputLabelClassName: PropTypes.string,
  inputName: PropTypes.string,
  placeholderText: PropTypes.string,
  inputType: PropTypes.string,
  togglePasswordVisibility: PropTypes.bool,
  toggleIconClassName: PropTypes.string,

};

export default Input;
