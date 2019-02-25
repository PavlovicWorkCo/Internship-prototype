import React from 'react';
import PropTypes from 'prop-types';
import './BagLabelsContainer.css';

const BagLabelsContainer = (props) => {
  const { numberOfItems } = props;
  return (
    <div className="Bag-labels-container">
      <p className="Number-of-items-label">
      Your bag –
        {` ${numberOfItems}`}
      </p>
      <p className="Bag-item-color-label"> Color </p>
      <p className="Bag-item-size-label"> Size </p>
      <p className="Bag-item-quantity-label"> Qty </p>
      <p className="Bag-item-price-label"> Price </p>
    </div>
  );
};

BagLabelsContainer.defaultProps = {
  numberOfItems: null,
};

BagLabelsContainer.propTypes = {
  numberOfItems: PropTypes.number,
};


export default BagLabelsContainer;
