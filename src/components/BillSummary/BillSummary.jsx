import './BillSummary.css';
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BillSummaryBag from './BillSummaryBag';
import BillSummaryCheckout from './BillSummaryCheckout';
/* eslint-disable react/button-has-type */

const BillSummary = (props) => { //eslint-disable-line
  return (
    <div className="Bill-summary-container">
      <div className="Bill-summary-content">
        <BillSummaryBag {...props} />
        <BillSummaryCheckout {...props} />
      </div>
    </div>
  );
};
export default BillSummary;

BillSummary.defaultProps = {
  checkoutViewActive: null,
};

BillSummary.propTypes = {
  checkoutViewActive: PropTypes.bool,
};
