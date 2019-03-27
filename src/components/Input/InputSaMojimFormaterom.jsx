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
    this.state = {
      inputWarningText: null,
      inputAcceptable: null,
      inputCheckerType: props.inputCheckerType, // eslint-disable-line object-shorthand
      inputValue: null,
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { defaultValue } = this.props;
    if (prevProps.defaultValue !== defaultValue) {
      this.setInputValue(defaultValue);
    }
  }

  onInputFocus(e) {
    const { onFocus } = this.props;
    this.setState({
      inputIsFocused: true,
    });
    if (!onFocus) return;
    onFocus(e);
  }

  onInputBlur(e) {
    const { onBlur } = this.props;
    this.inputCheck(e.target.value);
    this.setState({
      inputIsFocused: false,
    });
    if (!onBlur) return;
    onBlur(e);
  }

  onInputChange(e) {
    const { onChange } = this.props;
    this.setInputValue(e.target.value);
    if (!onChange) return;
    onChange(e);
  }

  onInputKeyDown(e) {
    const { onKeyDown } = this.props;
    if (!onKeyDown) return;
    onKeyDown(e);
  }

  setEmailAsInvalid() {
    this.setState({
      inputWarningText: 'Please eneter a valid emall',
      inputAcceptable: false,
    });
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
  }

  validatePassword(password) {
    this.setState({
      inputAcceptable: Validator.validatePassword(password),
      inputWarningText: Validator.validatePassword(password) ? null : 'Password must be at least 8 characters long.',
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
      inputID,
      emailIsEmptyWarning,
      defaultValue, // eslint-disable-line
      inputLabelText,
      passwordsDontMatchWarning,
      maxLength,
    } = this.props;

    const {
      inputValue,
      inputAcceptable,
      inputWarningText,
      inputIsFocused,
    } = this.state;

    const toggleIconClass = classNames({
      Active: inputValue,
      [`${toggleIconClassName}`]: true,
    });

    const inputClass = classNames({
      [`${inputClassName}`]: true,
      Focused: inputIsFocused,
    });

    return (
      <div className={containerClassName}>
        {inputLabeled && inputValue && inputLabelText
          && <p className={inputLabelClassName}>{inputLabelText}</p>}
        {inputLabeled && inputValue && !inputLabelText
          && <p className={inputLabelClassName}>{placeholderText}</p>}
        <div className="Input-inner-container">
          {((inputCheckerType && inputAcceptable === true) || passwordsDontMatchWarning === false) && <img alt="" className="Valid-input-icon" src={isValidIcon} />}
          {((inputCheckerType && inputAcceptable === false) || passwordsDontMatchWarning) && <img alt="" className="Not-valid-input-icon" src={notValidIcon} />}
          <input
            id={inputID}
            type={inputType}
            name={inputName}
            placeholder={placeholderText}
            className={inputClass}
            onFocus={e => this.onInputFocus(e)}
            onBlur={e => this.onInputBlur(e)}
            onChange={e => this.onInputChange(e)}
            ref={this.inputRef}
            value={inputValue}
            spellCheck={false}
            onKeyDown={e => this.onInputKeyDown(e)}
            maxLength={maxLength}
          />
          {togglePasswordVisibility && (
            <button type="button" onClick={() => this.passwordToggle()} className={toggleButtonClassName}>
              <ReactSVG src={TogglePasswordIcon} svgClassName={toggleIconClass} />
            </button>
          )}
        </div>
        {inputWarningText && inputAcceptable === false && <p className="Input-warning-text">{inputWarningText}</p>}
        {emailIsEmptyWarning && <p className="Input-warning-text">{emailIsEmptyWarning}</p>}
      </div>
    );
  }
}

Input.defaultProps = {
  containerClassName: 'Default-input-big-container',
  inputClassName: 'Default-input',
  inputCheckerType: null,
  inputLabeled: false,
  inputLabelClassName: 'Standard-input-label',
  inputName: null,
  placeholderText: null,
  inputType: 'text',
  togglePasswordVisibility: false,
  toggleButtonClassName: 'Password-toggle-button',
  toggleIconClassName: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  inputID: null,
  emailIsEmptyWarning: null,
  defaultValue: null,
  inputLabelText: null,
  passwordsDontMatchWarning: null,
  onKeyDown: null,
  maxLength: null,
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
  inputID: PropTypes.string,
  emailIsEmptyWarning: PropTypes.string,
  defaultValue: PropTypes.string,
  inputLabelText: PropTypes.string,
  passwordsDontMatchWarning: PropTypes.bool,
  onKeyDown: PropTypes.func,
  maxLength: PropTypes.number,

};

export default Input;
