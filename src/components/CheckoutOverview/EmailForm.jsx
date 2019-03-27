import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import classNames from 'classnames';
import { animateScroll as scroll } from 'react-scroll';
import FormLabel from './FormLabel';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Validator from '../../helper/Validator';
import './EmailForm.css';

class EmailForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      emailIsValid: false,
      emailInputValue: null,
      emailIsEmptyWarning: null,
      password: null,
      passwordRepeat: null,
      createPasswordView: false,
      passwordIsEmptyWarning: null,
      passwordRepeatEmptyWarning: null,
      passwordsDontMatchWarning: null,
      passwordIsInvalid: null,
    };
    this.formRef = React.createRef();
  }

  onEmailInputChange(e) {
    this.setState({
      emailInputValue: e.target.value,
      emailIsValid: Validator.validateEmail(e.target.value),
      emailIsEmptyWarning: null,
    });
  }

  onPasswordInputChange(e) {
    const { passwordRepeat } = this.state;
    if (e.target.value && Validator.validatePassword(e.target.value)
    && passwordRepeat && e.target.value === passwordRepeat) {
      this.setState({
        password: e.target.value,
        passwordsDontMatchWarning: false,
        passwordIsInvalid: false,
      });
    } else {
      this.setState({
        password: e.target.value,
        passwordIsInvalid: null,
      });
    }
  }

  onPasswordRepeatInputChange(e) {
    const { password } = this.state;
    if (password && Validator.validatePassword(password)
    && e.target.value && password === e.target.value) {
      this.setState({
        passwordRepeat: e.target.value,
        passwordsDontMatchWarning: false,
      });
    } else {
      this.setState({
        passwordRepeat: e.target.value,
        passwordsDontMatchWarning: null,
      });
    }
  }

  onPasswordFocus() {
    this.setState({
      passwordIsEmptyWarning: null,
      passwordRepeatEmptyWarning: null,
    });
  }

  onPasswordRepeatFocus() {
    this.setState({
      passwordRepeatEmptyWarning: null,
    });
  }

  onPasswordBlur() {
    this.validateBothPasswordInputs();
  }

  onConfirmPasswordBlur() {
    this.validateBothPasswordInputs();
  }

  onEmailInputBlur() {
    this.isEmailEmpty();
  }

  onContinueAsGuestClick() {
    const { emailIsValid, emailInputValue } = this.state;
    const { submitEmail, setEditingFormRef, heightAnimationTime } = this.props;
    if (!emailInputValue) {
      this.setState({
        emailIsEmptyWarning: 'Please enter your email address',
      });
    }
    if (!emailIsValid) return;
    submitEmail(emailInputValue);
    this.setState({
      createPasswordView: false,
    });
    setEditingFormRef(null);
    // top padding of checkoutcontainer is 55px;
    scroll.scrollTo(55, {
      duration: heightAnimationTime,
      containerId: 'checkout-container',
    });
  }

  onSaveAndContinueClick() {
    const { password, passwordRepeat } = this.state;
    if (!password || !Validator.validatePassword(password)
    || !passwordRepeat || password !== passwordRepeat) return;
    // we can continue as guest because the password isn't saved anywhere.
    this.onContinueAsGuestClick();
  }

  onCreatePasswordClick() {
    const { emailIsValid } = this.state;
    if (!emailIsValid) return;
    this.setState({
      createPasswordView: true,
    });
  }

  onEditEmailClick() {
    const { setEditingFormRef, editingFormRef, heightAnimationTime } = this.props;
    setEditingFormRef(this.formRef);
    if (editingFormRef === this.formRef.current) return;
    scroll.scrollTo(0, {
      duration: heightAnimationTime,
      containerId: 'checkout-container',
    });
  }

  validateBothPasswordInputs() {
    const { password, passwordRepeat } = this.state;
    if (!password) {
      this.setState({
        passwordIsEmptyWarning: 'Please enter your password',
      });
      return;
    }
    if (!Validator.validatePassword(password)) {
      this.setState({
        passwordIsInvalid: true,
      });
      // the warning text in this case is handled by the input component
      return;
    }
    if (!passwordRepeat) {
      this.setState({
        passwordRepeatEmptyWarning: 'Please repeat your password',
      });
      return;
    }
    if (password !== passwordRepeat) {
      this.setState({
        passwordsDontMatchWarning: true,
      });
      return;
    }
    this.setState({
      passwordsDontMatchWarning: false,
      passwordIsInvalid: false,
    });
  }

  isEmailEmpty() {
    const { emailInputValue } = this.state;
    if (!emailInputValue) {
      this.setState({
        emailIsEmptyWarning: 'Please enter your email address',
      });
    }
  }

  renderAccountOptions() {
    const { emailInputValue } = this.state;
    const hiddenClass = !emailInputValue ? 'Hidden' : '';
    return (
      <div className={`Account-options-container ${hiddenClass}`}>
        <p className="Account-options-text">
          Welcome! Create a password to save your information for one-click checkout,
           order tracking, VIP discounts and more!
        </p>
        <Button buttonText="Create a password" className="Light-button Checkout-light-button" onClick={() => this.onCreatePasswordClick()} />
        <Button onClick={() => this.onContinueAsGuestClick()} buttonText="Continue as guest" className="Light-button Checkout-light-button" />
      </div>
    );
  }

  renderPasswordInputs() {
    const {
      passwordsDontMatchWarning, passwordIsEmptyWarning, passwordRepeatEmptyWarning,
      password, passwordRepeat, passwordIsInvalid,
    } = this.state;
    const passwordsWarningHiddenClass = !passwordsDontMatchWarning ? 'Hidden' : '';
    const saveAndContinueButton = classNames({
      'Checkout-button Save-password-button': true,
      'Disabled-button': passwordsDontMatchWarning !== false,
    });
    return (
      <div>
        <p className="Password-notice">
          Create your password using at least 8 characters
          and some other interesting security rules for your own safety:
        </p>
        <Input
          containerClassName="Default-input-big-container Checkout-password-input"
          inputType="password"
          placeholderText="Password"
          inputCheckerType="password"
          inputClassName="Password-input Default-input"
          togglePasswordVisibility
          toggleIconClassName="Password-toggle-icon"
          onChange={e => this.onPasswordInputChange(e)}
          emailIsEmptyWarning={passwordIsEmptyWarning}
          onBlur={() => this.onPasswordBlur()}
          onFocus={() => this.onPasswordFocus()}
          inputId="account-password"
          defaultValue={password}
          passwordIsInvalid={passwordIsInvalid}
        />
        <Input
          containerClassName="Default-input-big-container Checkout-password-input"
          inputType="password"
          placeholderText="Confirm password"
          inputClassName="Password-input Default-input"
          togglePasswordVisibility
          toggleIconClassName="Password-toggle-icon"
          onChange={e => this.onPasswordRepeatInputChange(e)}
          emailIsEmptyWarning={passwordRepeatEmptyWarning}
          onBlur={() => this.onConfirmPasswordBlur()}
          onFocus={() => this.onPasswordRepeatFocus()}
          passwordsDontMatchWarning={passwordsDontMatchWarning}
          inputId="confirm-password"
          defaultValue={passwordRepeat}
        />
        <p className={`Passwords-dont-match-warning ${passwordsWarningHiddenClass}`}>
          {"Passwords don't match"}
        </p>
        <Button className={saveAndContinueButton} buttonText="Save and continue" onClick={e => this.onSaveAndContinueClick(e)} />
        <Button className="Checkout-button" buttonText="Continue as guest" onClick={e => this.onContinueAsGuestClick(e)} />
      </div>
    );
  }

  render() {
    const {
      loggedInMail, isExpanded, editingFormRef, heightAnimationTime,
    } = this.props;
    const { emailIsEmptyWarning, createPasswordView } = this.state;
    const height = (isExpanded || editingFormRef === this.formRef.current) ? 'auto' : 0;

    const checkoutEmailOverviewIsVisible = loggedInMail && !isExpanded
      && editingFormRef !== this.formRef.current;

    const emailPreviewClass = classNames({
      'Checkout-email-overview': true,
      Transparent: !checkoutEmailOverviewIsVisible,
    });

    const editButtonHidden = editingFormRef === this.formRef.current || isExpanded || !loggedInMail ? 'Hidden' : '';
    return (
      <div className="Checkout-email-form-container" ref={this.formRef}>
        <FormLabel formNumber="1" formLabel="Your Email" />
        <Button
          className={`Transparent-button Checkout-form-edit-button ${editButtonHidden}`}
          buttonText="Edit"
          onClick={() => this.onEditEmailClick()}
        />
        <div className="Checkout-email-form-content-wrapper">
          <div className={emailPreviewClass}>{loggedInMail}</div>
          <AnimateHeight
            duration={heightAnimationTime}
            height={height}
            animateOpacity
            easing="linear"
          >
            <React.Fragment>
              <Input
                containerClassName="Checkout-email-input-container"
                placeholderText="Email"
                inputCheckerType="email"
                inputClassName="Default-input Checkout-input-size"
                onChange={e => this.onEmailInputChange(e)}
                emailIsEmptyWarning={emailIsEmptyWarning}
                defaultValue={loggedInMail}
                onBlur={() => this.onEmailInputBlur()}
              />
              <p className="Privacy-notice">
                See our
                <span className="Fake-link"> Privacy policy </span>
              </p>
              {!createPasswordView && this.renderAccountOptions()}
              {createPasswordView && this.renderPasswordInputs()}
            </React.Fragment>
          </AnimateHeight>
        </div>
      </div>
    );
  }
}

EmailForm.defaultProps = {
  submitEmail: null,
  loggedInMail: null,
  isExpanded: false,
  setEditingFormRef: null,
  editingFormRef: null,
  heightAnimationTime: null,
};

EmailForm.propTypes = {
  submitEmail: PropTypes.func,
  loggedInMail: PropTypes.string,
  isExpanded: PropTypes.bool,
  setEditingFormRef: PropTypes.func,
  editingFormRef: PropTypes.object,
  heightAnimationTime: PropTypes.number,
};

export default EmailForm;
