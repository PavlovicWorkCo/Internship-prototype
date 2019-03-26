import PropTypes from 'prop-types';
import React from 'react';
import xDeleteIcon from '../../assets/icons/x-delete.svg';
import Button from '../Button/Button';

const PromoCodeResults = ({
  promoDiscount, bagItemsCost, promoCodeSubmitted, focusedFormId, submitPromoCode,
}) => {
  const fadedClass = focusedFormId ? 'Faded' : 'Unfaded';
  return (
    <div className={`Promo-code-active-container ${fadedClass}`}>
      <div className="Promo-code-discount-container">
        <p>
          {promoDiscount}
          % off sitewide
        </p>
        <p>
          -$
          {bagItemsCost / 100 * promoDiscount}
        </p>
      </div>
      <div className="Current-promo-code-container">
        <p>
          Code:
          {promoCodeSubmitted}
        </p>
        <Button
          buttonIcon={xDeleteIcon}
          onClick={() => submitPromoCode(null)}
        />
      </div>
    </div>
  );
};

PromoCodeResults.defaultProps = {
  promoDiscount: null,
  bagItemsCost: null,
  promoCodeSubmitted: null,
  focusedFormId: null,
  submitPromoCode: null,
};

PromoCodeResults.propTypes = {
  promoDiscount: PropTypes.number,
  bagItemsCost: PropTypes.number,
  promoCodeSubmitted: PropTypes.bool,
  focusedFormId: PropTypes.string,
  submitPromoCode: PropTypes.func,
};

export default PromoCodeResults;
