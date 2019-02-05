import './Input.css';
import PropTypes from 'prop-types';
import React from 'react';
import isValidIcon from '../../../public/icons/isValidInput.svg';
import notValidIcon from '../../../public/icons/notValidInput.svg';

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
    if (typeof email === 'string' && email.includes('@')) {
      this.setState({
        inputAcceptable: true,
      });
    } else {
      this.setState({
        inputAcceptable: false,
        inputWarningText: 'no @ in email',
      });
    }
  }

  validatePassword(password) {
    if (typeof password === 'string' && /\d/.test(password)) {
      this.setState({
        inputAcceptable: true,
      });
    } else {
      this.setState({
        inputAcceptable: false,
        inputWarningText: "password doesn't contain number",
      });
    }
  }

  passwordToggle() {
    alert('toggle'); // eslint-disable-line
  }

  render() {
    const {
      inputCheckerType,
      inputName,
      inputType,
      inputClassName,
      inputIcon,
      iconClassName,
      placeholderText,
    } = this.props;

    const {
      inputAcceptable,
      inputWarningText,
    } = this.state;
    return (
      <div className="Input-big-container">
        <div className="Input-container">
          {inputCheckerType && inputAcceptable === true && <img alt="" className="Valid-input-icon" src={isValidIcon} />}
          {inputCheckerType && inputAcceptable === false && <img alt="" className="Not-valid-input-icon" src={notValidIcon} />}
          <input
            type={inputType}
            name={inputName}
            placeholder={placeholderText}
            className={inputClassName}
            onBlur={e => this.inputCheck(e.target.value)}
          />
          {/* eslint-disable-next-line */}
          {inputIcon && <img onClick={()=> this.passwordToggle()} alt="" className={iconClassName} src={inputIcon} />}
        </div>
        {inputWarningText && inputAcceptable === false && <p className="Input-warning-text">{inputWarningText}</p>}
      </div>
    );
  }
}

Input.defaultProps = {
  inputCheckerType: null,
  inputIcon: null,
  iconClassName: null,
  inputName: null,
  placeholderText: null,
  inputClassName: null,
  inputType: 'text',
};

Input.propTypes = {
  inputCheckerType: PropTypes.string,
  inputIcon: PropTypes.string,
  iconClassName: PropTypes.string,
  inputName: PropTypes.string,
  placeholderText: PropTypes.string,
  inputClassName: PropTypes.string,
  inputType: PropTypes.string,
};

export default Input;
