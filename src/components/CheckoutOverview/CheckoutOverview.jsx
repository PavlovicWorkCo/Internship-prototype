import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
/* eslint-disable react/button-has-type */

const CheckoutOverview = (props) => { //eslint-disable-line
  const { bagItemsInfo } = props;
  const shippingIsFree = bagItemsInfo.length > 2;
  return (
    <div className="a">
      <div>
        aa
        {shippingIsFree}
      </div>
      <div>
        bbbbbb
      </div>
      <div>
        cccccccaa
      </div>
    </div>
  );
};
export default CheckoutOverview;

CheckoutOverview.defaultProps = {
  bagItemsInfo: null,
};

CheckoutOverview.propTypes = {
  bagItemsInfo: PropTypes.arrayOf(PropTypes.object),
};
