import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './BillSummary.css';
import Button from '../Button/Button';
import { freeShippingThreshold } from '../../helper/costChangers';
import TaxShippingAndPromo from './TaxShippingAndPromo';
import BillSummaryCheckout from './BillSummaryCheckout';

class BillSummary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focusedFormId: null,
    };
  }

  onBillSummaryInputFocusToggle(formId) {
    this.setState({
      focusedFormId: formId,
    });
  }

  render() {
    const {
      focusedFormId,
    } = this.state;
    const {
      bagItemsCost, isShippingToAddressFree, checkoutViewActive, gstTax, pstTax,
      setCheckoutView, totalCost, pickupInStore, paymentMethodSubmitted,
      promoCodeSubmitted, submitPromoCode, promoDiscount,
    } = this.props;
    const fadedClass = focusedFormId ? 'Faded' : 'Unfaded'; // faded when postal code input or promo code input are focused
    const taxShippingPromoContainerClass = classNames({
      'Tax-shipping-promo-container': true,
      'Slide-away-slightly Fade-away': checkoutViewActive,
      'Slide-in-slightly Fade-in': !checkoutViewActive,
    });
    const costAndCheckoutContainerClass = classNames({
      'Cost-and-checkout-container': true,
      'Fade-away': checkoutViewActive,
      'Fade-in': !checkoutViewActive,
    });
    const billSummaryCheckoutClass = classNames({
      'Bill-summary-checkout': true,
      'Bill-summary-checkout Fade-in': checkoutViewActive,
      'Bill-summary-checkout Fade-away': !checkoutViewActive,
    });

    return (
      <div className="Bill-summary-container">
        <div className="Bill-summary-bag-container">
          <div className="Bill-summary-bag">
            <div className={`Shipping-cost-status-container ${fadedClass}`}>
              <span className="Bullet-point-shipping-cost" />
              <p>
                {isShippingToAddressFree ? "YOU'VE QUALIFIED FOR FREE SHIPPING"
                  : `YOU'RE $${freeShippingThreshold - bagItemsCost} AWAY FROM FREE SHIPPING` }
              </p>
            </div>
            <div className={`Bill-summary-label-container ${fadedClass}`}>
              <p className="Bill-summary-label">Summary</p>
            </div>
            <div className="Bill-summary-content-wrapper">
              <div className={taxShippingPromoContainerClass}>
                <TaxShippingAndPromo
                  {...this.props}
                  onBillSummaryInputFocusToggle={
                    formId => this.onBillSummaryInputFocusToggle(formId)
                  }
                  focusedFormId={focusedFormId}
                />
              </div>
              <div className={billSummaryCheckoutClass}>
                <BillSummaryCheckout
                  gstTax={gstTax}
                  pstTax={pstTax}
                  pickupInStore={pickupInStore}
                  isShippingToAddressFree={isShippingToAddressFree}
                  paymentMethodSubmitted={paymentMethodSubmitted}
                  totalCost={totalCost}
                  bagItemsCost={bagItemsCost}
                  promoDiscount={promoDiscount}
                  onBillSummaryInputFocusToggle={
                    formId => this.onBillSummaryInputFocusToggle(formId)
                  }
                  focusedFormId={focusedFormId}
                  promoCodeSubmitted={promoCodeSubmitted}
                  submitPromoCode={submitPromoCode}
                />
              </div>
            </div>
          </div>
          <div className={costAndCheckoutContainerClass}>
            <div className="Total-cost-container">
              <p className="Total-cost-label">Subtotal:</p>
              <p className="Total-cost-value">{`$${totalCost}`}</p>
            </div>
            <Button
              buttonText="Checkout now"
              buttonTextClassName="Checkout-button-text"
              className="Checkout-button Bill-summary-button"
              onClick={() => setCheckoutView(true)}
            />
          </div>
        </div>
      </div>
    );
  }
}

BillSummary.defaultProps = {
  setCheckoutView: null,
  checkoutViewActive: null,
  bagItemsCost: null,
  promoCodeSubmitted: null,
  isShippingToAddressFree: null,
  totalCost: null,
  promoDiscount: null,
  postalCodeSubmitted: null,
  gstTax: null,
  pstTax: null,
  setPickupInStore: null,
  submitPromoCode: null,
  submitPostalCode: null,
  pickupInStore: null,
  paymentMethodSubmitted: null,
};

BillSummary.propTypes = {
  setCheckoutView: PropTypes.func,
  checkoutViewActive: PropTypes.bool,
  bagItemsCost: PropTypes.number,
  promoCodeSubmitted: PropTypes.string,
  isShippingToAddressFree: PropTypes.bool,
  totalCost: PropTypes.number,
  promoDiscount: PropTypes.number,
  postalCodeSubmitted: PropTypes.string,
  gstTax: PropTypes.number,
  pstTax: PropTypes.number,
  setPickupInStore: PropTypes.func,
  submitPromoCode: PropTypes.func,
  submitPostalCode: PropTypes.func,
  pickupInStore: PropTypes.bool,
  paymentMethodSubmitted: PropTypes.object,
};


export default BillSummary;
