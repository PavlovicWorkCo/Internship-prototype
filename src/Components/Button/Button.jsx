import './Button.css';
import PropTypes from 'prop-types';
import React from 'react';
/* eslint-disable react/button-has-type */

const Button = ({
  className, buttonText, buttonIcon, iconClassName, buttonTextClassName, onClick, buttonType,
}) => (
  <button type={buttonType} className={className} onClick={onClick}>
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
};

Button.propTypes = {
  buttonTextClassName: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
};

export default Button;
