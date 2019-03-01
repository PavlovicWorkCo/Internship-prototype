import './Button.css';
import PropTypes from 'prop-types';
import React from 'react';
/* eslint-disable react/button-has-type */

const Button = ({
  className, buttonText, buttonIcon, iconClassName, buttonTextClassName, onClick, buttonType, form,
}) => (
  <button type={buttonType} className={className} onClick={onClick} form={form}>
    {buttonText && <p className={buttonTextClassName}>{buttonText}</p>}
    {buttonIcon && <img alt="" className={iconClassName} src={buttonIcon} />}
  </button>
);

Button.defaultProps = {
  buttonTextClassName: null,
  buttonText: null,
  className: null,
  iconClassName: null,
  buttonIcon: null,
  onClick: null,
  buttonType: 'submit',
  form: null,
};

Button.propTypes = {
  buttonTextClassName: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
  form: PropTypes.string,
};

export default Button;
