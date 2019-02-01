import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  className, buttonText, buttonIconURL, iconClassName,
}) => {
  let buttonIcon;
  if (buttonIconURL) {
    buttonIcon = <img alt="" className={iconClassName} src={buttonIconURL} />;
  }
  return (
    <button type="button" className={className}>
      {buttonText}
      {buttonIcon}
    </button>
  );
};

Button.defaultProps = {
  className: null,
  buttonText: null,
  iconClassName: null,
  buttonIconURL: null,
};

Button.propTypes = {
  buttonIconURL: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default Button;
