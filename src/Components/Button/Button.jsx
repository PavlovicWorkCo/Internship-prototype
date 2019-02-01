import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  className, buttonText, buttonIconURL, iconClassName, buttonTextClassName,
}) => (
  <button type="button" className={className}>
    {buttonText && <p className={buttonTextClassName}>{buttonText}</p>}
    {buttonIconURL && <img alt="" className={iconClassName} src={buttonIconURL} />}
  </button>
);

Button.defaultProps = {
  buttonTextClassName: null,
  buttonText: null,
  className: null,
  iconClassName: null,
  buttonIconURL: null,
};

Button.propTypes = {
  buttonTextClassName: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIconURL: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default Button;
