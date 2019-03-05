import './BillSummary.css';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
/* eslint-disable react/button-has-type */

const BillSummaryCheckout = (props) => {
  const { checkoutViewActive } = props;
  const billSummaryCheckoutClass = classNames({
    'Bill-summary-checkout-final': checkoutViewActive,
    'Bill-summary-checkout': true,
  });
  return (
    <div className={billSummaryCheckoutClass}>
      <div>
        aaaa
      </div>
      <div>
        bbbbbb
      </div>
      <div>
        ccccccc
      </div>
    </div>
  );
};

export default BillSummaryCheckout;

BillSummaryCheckout.defaultProps = {
  checkoutViewActive: null,
};

BillSummaryCheckout.propTypes = {
  checkoutViewActive: PropTypes.bool,

};
