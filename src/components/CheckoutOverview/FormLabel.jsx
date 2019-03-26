import React from 'react';
import PropTypes from 'prop-types';

const FormLabel = (props) => {
  const { formNumber, formLabel } = props;

  return (
    <div className="Checkout-phase-label">
      <p>{formNumber}</p>
      <p className="Phase-label-name">{formLabel}</p>
    </div>
  );
};

FormLabel.defaultProps = {
  formNumber: null,
  formLabel: null,
};

FormLabel.propTypes = {
  formNumber: PropTypes.string,
  formLabel: PropTypes.string,
};


export default FormLabel;
