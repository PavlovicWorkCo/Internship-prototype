import React from 'react';
import PropTypes from 'prop-types';
import { defaultShippingCost } from '../../helper/costChangers';
import './BillSummaryCheckout.css';
import PromoCodeDropdown from './PromoCodeDropdown';
import PromoCodeResults from './PromoCodeResults';

class BillSummaryCheckout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: null,
    };
  }

  onPromoCodeChange(e) {
    this.setState({
      promoCode: e.target.value,
    });
  }

  submitPromoCode(e) {
    e.preventDefault();
    const { promoCode } = this.state;
    const { submitPromoCode } = this.props;
    if (!promoCode) return;
    submitPromoCode(promoCode);
    this.setState({
      promoCodeFormIsShowing: false,
    });
    document.activeElement.blur();
  }

  togglePromoCodeFormVisibility() {
    const { promoCodeFormIsShowing } = this.state;
    this.setState({
      promoCodeFormIsShowing: !promoCodeFormIsShowing,
    });
  }

  renderTaxes() {
    const { gstTax, pstTax } = this.props;
    return (
      <div className="Checkout-summary-tax">
        { gstTax !== 0 ? (
          <React.Fragment>
            <div className="Space-between Gst-tax">
              <p>GST</p>
              <p>{`$${gstTax}`}</p>
            </div>
            <div className="Space-between Pst-tax">
              <p>PST</p>
              <p>{`$${pstTax}`}</p>
            </div>
          </React.Fragment>
        ) : (
          <div className="Space-between">
            <p>Taxes</p>
            <p>TBD</p>
          </div>
        )}
      </div>
    );
  }

  renderShipping() {
    const { isShippingToAddressFree, pickupInStore } = this.props;
    return (
      <div className="Checkout-summary-shipping Space-between">
        <p>Shipping</p>
        <p>{(isShippingToAddressFree || pickupInStore) ? 'Free' : `$${defaultShippingCost}`}</p>
      </div>
    );
  }

  renderPromoCodeDropdown() {
    const { promoCodeSubmitted, onBillSummaryInputFocusToggle, focusedFormId } = this.props;
    const { promoCode, promoCodeFormIsShowing } = this.state;
    return (
      <PromoCodeDropdown
        promoCodeSubmitted={promoCodeSubmitted}
        onBillSummaryInputFocusToggle={onBillSummaryInputFocusToggle}
        focusedFormId={focusedFormId}
        promoCodeFormIsShowing={promoCodeFormIsShowing}
        togglePromoCodeFormVisibility={() => this.togglePromoCodeFormVisibility()}
        submitPromoCode={e => this.submitPromoCode(e)}
        onPromoCodeChange={e => this.onPromoCodeChange(e)}
        promoCode={promoCode}
      />
    );
  }

  renderPromoCodeResult() {
    const {
      promoDiscount, bagItemsCost, promoCodeSubmitted, focusedFormId, submitPromoCode,
    } = this.props;
    return (
      <PromoCodeResults
        promoDiscount={promoDiscount}
        bagItemsCost={bagItemsCost}
        promoCodeSubmitted={promoCodeSubmitted}
        focusedFormId={focusedFormId}
        submitPromoCode={submitPromoCode}
      />
    );
  }

  renderTotalCost() {
    const { paymentMethodSubmitted, totalCost } = this.props;
    return (
      <div className="Checkout-summary-total-cost Space-between">
        <p>{paymentMethodSubmitted ? 'Total' : 'Subtotal'}</p>
        <p>{`$${totalCost}`}</p>
      </div>
    );
  }

  render() {
    const { promoCodeSubmitted } = this.props;
    return (
      <React.Fragment>
        {this.renderTaxes()}
        {this.renderShipping()}
        {promoCodeSubmitted && this.renderPromoCodeResult()}
        {this.renderPromoCodeDropdown()}
        {this.renderTotalCost()}
      </React.Fragment>
    );
  }
}

BillSummaryCheckout.defaultProps = {
  gstTax: null,
  pstTax: null,
  isShippingToAddressFree: null,
  pickupInStore: null,
  paymentMethodSubmitted: null,
  totalCost: null,
  promoCodeSubmitted: null,
  onBillSummaryInputFocusToggle: null,
  focusedFormId: null,
  submitPromoCode: null,
  promoDiscount: null,
  bagItemsCost: null,
};

BillSummaryCheckout.propTypes = {
  gstTax: PropTypes.number,
  pstTax: PropTypes.number,
  isShippingToAddressFree: PropTypes.bool,
  pickupInStore: PropTypes.bool,
  paymentMethodSubmitted: PropTypes.object,
  totalCost: PropTypes.number,
  promoCodeSubmitted: PropTypes.bool,
  onBillSummaryInputFocusToggle: PropTypes.func,
  focusedFormId: PropTypes.string,
  submitPromoCode: PropTypes.func,
  promoDiscount: PropTypes.number,
  bagItemsCost: PropTypes.number,
};

export default BillSummaryCheckout;
