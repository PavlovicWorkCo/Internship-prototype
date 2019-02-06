import './Input.css';
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
    this.passwordInput = React.createRef();
  }

  setInputValue(value) {
    this.setState({
      inputValue: value,
      inputWarningText: null,
      inputAcceptable: null,
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

  passwordToggle() {
    const { inputValue } = this.state;
    if (!inputValue) return;
    if (this.passwordInput.current.type === 'text') {
      this.passwordInput.current.type = 'password';
    } else {
      this.passwordInput.current.type = 'text';
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
            ref={this.passwordInput}
          />
          {togglePasswordVisibility && (
            <button type="button" onClick={() => this.passwordToggle()} className={toggleButtonClassName}>
              <ReactSVG src={TogglePasswordIcon} svgClassName={toggleIconClassName} />
            </button>
          )}
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
  toggleButtonClassName: null,
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
  toggleButtonClassName: PropTypes.string,
  toggleIconClassName: PropTypes.string,

};

export default Input;
