import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './BillSummaryBag.css';
import Button from '../Button/Button';
import expandArrow from '../../assets/icons/dropdownArrow.svg';
import xDeleteIcon from '../../assets/icons/x-delete.svg';
import BillSummaryForm from '../BillSummaryForm/BillSummaryForm';
import RadioInput from '../RadioInput/RadioInput';
import { defaultShippingCost, freeShippingThreshold } from '../../helper/costChangers';

class BillSummaryBag extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taxEstimateIsShowing: null,
      postalCode: null,
      postalCodeIsInvalid: false,
      promoCodeFormIsShowing: null,
      promoCode: null,
      focusedFormId: null,
    };
  }

  onBillSummaryInputFocusToggle(formId) {
    this.setState({
      focusedFormId: formId,
    });
  }

  onPostalCodeChange(inputValue) {
    this.setState({
      postalCode: inputValue,
      postalCodeIsInvalid: false,
    });
  }

  onPromoCodeChange(inputValue) {
    this.setState({
      promoCode: inputValue,
    });
  }

  onShippingOptionChange() {
    const { togglePickupInStore } = this.props;
    togglePickupInStore();
  }

  fakeValidatePostalCode(postalCode) {
    return /\d/.test(postalCode);
  }

  submitPostalCode(e) {
    e.preventDefault();
    const { postalCode } = this.state;
    const { submitPostalCode } = this.props;
    if (postalCode === null) return;
    if (this.fakeValidatePostalCode(postalCode)) {
      submitPostalCode(postalCode);
      this.setState({
        postalCodeIsInvalid: false,
      });
      document.activeElement.blur();
      // blur the current input so the elements are not faded anymore after submit
    } else {
      this.setState({
        postalCodeIsInvalid: true,
      });
    }
  }

  submitPromoCode(e) {
    e.preventDefault();
    const { promoCode } = this.state;
    const { submitPromoCode } = this.props;
    if (promoCode === null) return;
    submitPromoCode(promoCode);
    this.setState({
      promoCodeFormIsShowing: false,
    });
    document.activeElement.blur();
  }

  removePromoCode() {
    const { submitPromoCode } = this.props;
    submitPromoCode(null);
  }

  toggleTaxEstimationVisibility() {
    const { taxEstimateIsShowing } = this.state;
    this.setState({
      promoCodeFormIsShowing: false,
      taxEstimateIsShowing: !taxEstimateIsShowing,
    });
  }

  togglePromoCodeFormVisibility() {
    const { promoCodeFormIsShowing } = this.state;
    const { postalCodeSubmitted } = this.props;
    if (postalCodeSubmitted) {
      // if the tax is already calculated,
      // dont hide tax container when promo code container is toggled
      this.setState({
        promoCodeFormIsShowing: !promoCodeFormIsShowing,
      });
    } else {
      this.setState({
        taxEstimateIsShowing: false,
        promoCodeFormIsShowing: !promoCodeFormIsShowing,
      });
    }
  }

  renderTaxCost() {
    const {
      gstTax, pstTax,
    } = this.props;
    return (
      <div className="Tax-costs-container">
        <div className="Tax-cost-container">
          <p>GST:</p>
          <p>
            {gstTax}
            $
          </p>
        </div>
        <div className="Tax-cost-container">
          <p>PST:</p>
          <p>
            {pstTax}
            $
          </p>
        </div>
      </div>
    );
  }

  renderTaxEstimateContainer() {
    const {
      taxEstimateIsShowing, postalCodeIsInvalid, postalCode, focusedFormId,
    } = this.state;
    const { postalCodeSubmitted } = this.props;
    const formId = 'postal-code-form';
    const arrowIconClass = classNames({
      Active: taxEstimateIsShowing,
      'Estimate-tax-expand-icon': true,
    });
    const postalCodeButtonClass = classNames({
      'Disabled-button': !postalCode,
      'Checkout-button': true,
      'Postal-code-submit-button': true,
    });
    const estimateTaxContainerClass = classNames({
      Expanded: taxEstimateIsShowing,
      Collapsed: taxEstimateIsShowing === false,
      'Estimate-tax-container': true,
      Faded: (focusedFormId !== formId) && focusedFormId,

    });
    const postalCodeFormContainerClass = classNames({
      'Postal-code-form-container': true,
      Visible: taxEstimateIsShowing,
      Invisible: !taxEstimateIsShowing,
    });
    return (
      <div className={estimateTaxContainerClass}>
        <Button
          className="Transparent-button Estimate-tax-button"
          buttonText="Estimate your tax"
          buttonIcon={expandArrow}
          iconClassName={arrowIconClass}
          onClick={() => this.toggleTaxEstimationVisibility()}
        />
        {!postalCodeSubmitted
          && (
            <BillSummaryForm
              formContainerClassName={postalCodeFormContainerClass}
              formId={formId}
              onSubmit={e => this.submitPostalCode(e)}
              inputPlaceholderText="Postal Code"
              inputClassName="Postal-code-input Default-input"
              inputContainerClassName="Postal-code-input-container"
              onInputChange={inputValue => this.onPostalCodeChange(inputValue)}
              buttonText="Estimate"
              buttonClass={postalCodeButtonClass}
              onInputFocus={() => this.onBillSummaryInputFocusToggle(formId)}
              onInputBlur={() => this.onBillSummaryInputFocusToggle(null)}
            />
          )}
        {taxEstimateIsShowing && postalCodeIsInvalid && (
          <p className="Postal-code-warning">Please enter a valid postal code</p>
        )}
        {taxEstimateIsShowing && postalCodeSubmitted && this.renderTaxCost()}
      </div>
    );
  }

  renderShippingOptions() {
    const { focusedFormId } = this.state;
    const { isShippingToAddressFree } = this.props;
    const fadedClass = focusedFormId ? 'Faded' : 'Unfaded';
    return (
      <div className={`Shipping-options-container ${fadedClass}`}>
        <p>Shipping options</p>
        <form onChange={() => this.onShippingOptionChange()} className="Shipping-form">
          <div>
            <RadioInput
              inputId="ship-to-adress"
              name="shipping-option"
              radioLabelText="To an address"
              isDefaultChecked
            />
            <p>
              {isShippingToAddressFree && <span className="Ship-to-address-free">Free</span>}
              {`$${defaultShippingCost}`}
            </p>
          </div>
          <div>
            <RadioInput
              name="shipping-option"
              inputId="pickup-in-store"
              radioLabelText="Pickup in store"
            />
            <p>Free</p>
          </div>
        </form>
      </div>
    );
  }

  renderPromoCodeResult() {
    const { focusedFormId } = this.state;
    const { promoDiscount, bagItemsCost, promoCodeSubmitted } = this.props;
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
            onClick={() => this.removePromoCode()}
          />
        </div>
      </div>
    );
  }

  renderPromoCodeContainer() {
    const {
      promoCodeFormIsShowing, promoCode, focusedFormId,
    } = this.state;
    const { promoCodeSubmitted } = this.props;
    const formId = 'promo-code-form';
    const arrowIconClass = classNames({
      Active: promoCodeFormIsShowing,
      'Estimate-tax-expand-icon': true,
    });
    const promoCodeButtonClass = classNames({
      'Disabled-button': !promoCode,
      'Checkout-button': true,
      'Promo-code-submit-button': true,
    });
    const promoCodeContainerClass = classNames({
      Expanded: promoCodeFormIsShowing,
      Collapsed: promoCodeFormIsShowing === false,
      'Promo-code-container': true,
      Faded: (focusedFormId !== formId) && focusedFormId,
    });
    const promoCodeFormContainerClass = classNames({
      'Promo-code-form-container': true,
      Visible: promoCodeFormIsShowing,
      Invisible: !promoCodeFormIsShowing,
      'Display-none': promoCodeSubmitted && !promoCodeFormIsShowing,
    });
    return (
      <div className={promoCodeContainerClass}>
        <Button
          className="Transparent-button Promo-code-button"
          buttonText="Have a promo code?"
          buttonIcon={expandArrow}
          iconClassName={arrowIconClass}
          onClick={() => this.togglePromoCodeFormVisibility()}
        />
        <BillSummaryForm
          formContainerClassName={promoCodeFormContainerClass}
          formId={formId}
          onSubmit={e => this.submitPromoCode(e)}
          inputPlaceholderText="Enter promo Code"
          inputClassName="Postal-code-input Default-input"
          inputContainerClassName="Postal-code-input-container"
          onInputChange={inputValue => this.onPromoCodeChange(inputValue)}
          buttonText="Apply"
          buttonClass={promoCodeButtonClass}
          onInputFocus={() => this.onBillSummaryInputFocusToggle(formId)}
          onInputBlur={() => this.onBillSummaryInputFocusToggle(null)}
        />
      </div>
    );
  }

  render() {
    const { focusedFormId } = this.state;
    const {
      bagItemsCost, promoCodeSubmitted, isShippingToAddressFree,
      checkoutViewActive, goToCheckout, totalCost,
    } = this.props;
    const fadedClass = focusedFormId ? 'Faded' : 'Unfaded';
    const billSummaryBagClass = classNames({
      'Slide-away-slightly': checkoutViewActive,
      'Bill-summary-bag': true,
    });
    const billSummaryFadeAwayClass = classNames({
      'Fade-away': checkoutViewActive,
      'Bill-summary-bag-container': true,
    });

    return (
      <div className={billSummaryFadeAwayClass}>
        <div className="Bill-summary-bag-wrapper">
          <div className={billSummaryBagClass}>
            <div className={`Shipping-cost-status-container ${fadedClass}`}>
              <div className="Bullet-point-shipping-cost" />
              <p>
                {isShippingToAddressFree ? "YOU'VE QUALIFIED FOR FREE SHIPPING"
                  : `YOU'RE $${freeShippingThreshold - bagItemsCost} AWAY FROM FREE SHIPPING` }
              </p>
            </div>
            <div className={`Bill-summary-label-container ${fadedClass}`}>
              <p className="Bill-summary-label">Summary</p>
            </div>
            {this.renderTaxEstimateContainer()}
            {this.renderShippingOptions()}
            {promoCodeSubmitted && this.renderPromoCodeResult()}
            {this.renderPromoCodeContainer()}
          </div>
        </div>
        <div className="Cost-and-checkout-container">
          <div className="Total-cost-container">
            <p className="Total-cost-label">Subtotal:</p>
            <p className="Total-cost-value">{`$${totalCost}`}</p>
          </div>
          <Button
            buttonText="Checkout now"
            buttonTextClassName="Checkout-button-text"
            className="Checkout-button Bill-summary-button"
            onClick={() => goToCheckout()}
          />
        </div>
      </div>
    );
  }
}

BillSummaryBag.defaultProps = {
  goToCheckout: null,
  checkoutViewActive: null,
  bagItemsCost: null,
  promoCodeSubmitted: null,
  isShippingToAddressFree: null,
  totalCost: null,
  promoDiscount: null,
  postalCodeSubmitted: null,
  gstTax: null,
  pstTax: null,
  togglePickupInStore: null,
  submitPromoCode: null,
  submitPostalCode: null,
};

BillSummaryBag.propTypes = {
  goToCheckout: PropTypes.func,
  checkoutViewActive: PropTypes.bool,
  bagItemsCost: PropTypes.number,
  promoCodeSubmitted: PropTypes.string,
  isShippingToAddressFree: PropTypes.bool,
  totalCost: PropTypes.number,
  promoDiscount: PropTypes.number,
  postalCodeSubmitted: PropTypes.string,
  gstTax: PropTypes.number,
  pstTax: PropTypes.number,
  togglePickupInStore: PropTypes.func,
  submitPromoCode: PropTypes.func,
  submitPostalCode: PropTypes.func,
};


export default BillSummaryBag;
