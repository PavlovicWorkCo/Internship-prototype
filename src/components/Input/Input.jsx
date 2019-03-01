import './Input.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactSVG from 'react-svg';
import isValidIcon from '../../assets/icons/isValidInput.svg';
import notValidIcon from '../../assets/icons/notValidInput.svg';
import Validator from '../../helper/Validator';
import TogglePasswordIcon from '../../assets/icons/togglePasswordVisibility.svg';


class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    const { inputCheckerType } = this.props;
    this.state = {
      inputWarningText: null,
      inputAcceptable: null,
      inputCheckerType: inputCheckerType, // eslint-disable-line object-shorthand
    };
    this.inputRef = React.createRef();
  }

  onInputBlur(e) {
    const { onBlur } = this.props;
    this.inputCheck(e.target.value);
    onBlur(e);
  }

  setInputValue(value) {
    const { onChange } = this.props;
    this.setState({
      inputValue: value,
      inputWarningText: null,
      inputAcceptable: null,
    });
    onChange(value);
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
  }

  validatePassword(password) {
    this.setState({
      inputAcceptable: Validator.validatePassword(password),
      inputWarningText: Validator.validatePassword(password) ? null : 'Password must contain at least eight characters.',
    });
  }

  passwordToggle() {
    const { inputValue } = this.state;
    if (!inputValue) return;
    if (this.inputRef.current.type === 'text') {
      this.inputRef.current.type = 'password';
    } else {
      this.inputRef.current.type = 'text';
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
      toggleButtonClassName,
      toggleIconClassName,
      onFocus,
    } = this.props;

    const {
      inputValue,
      inputAcceptable,
      inputWarningText,
    } = this.state;

    const toggleIconClass = classNames({
      Active: inputValue,
      [`${toggleIconClassName}`]: true,
    });
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
            onFocus={onFocus}
            onBlur={e => this.onInputBlur(e)}
            onChange={e => this.setInputValue(e.target.value)}
            ref={this.inputRef}
          />
          {togglePasswordVisibility && (
            <button type="button" onClick={() => this.passwordToggle()} className={toggleButtonClassName}>
              <ReactSVG src={TogglePasswordIcon} svgClassName={toggleIconClass} />
            </button>
          )}
        </div>
        {inputWarningText && inputAcceptable === false && <p className="Input-warning-text">{inputWarningText}</p>}
      </div>
    );
  }
}

Input.defaultProps = {
  containerClassName: 'Default-input-big-container',
  inputClassName: 'Default-input',
  inputCheckerType: null,
  inputLabeled: false,
  inputLabelClassName: null,
  inputName: null,
  placeholderText: null,
  inputType: 'text',
  togglePasswordVisibility: false,
  toggleButtonClassName: 'Password-toggle-button',
  toggleIconClassName: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
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
  toggleButtonClassName: PropTypes.string,
  toggleIconClassName: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

};

export default Input;
