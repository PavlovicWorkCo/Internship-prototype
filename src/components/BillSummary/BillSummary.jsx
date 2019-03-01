import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './BillSummary.css';
import Button from '../Button/Button';
import expandArrow from '../../assets/icons/dropdownArrow.svg';
import xDeleteIcon from '../../assets/icons/x-delete.svg';
import BillSummaryForm from '../BillSummaryForm/BillSummaryForm';
import RadioInput from '../RadioInput/RadioInput';

class BillSummary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.freeShippingThreshold = 112;
    this.defaultShipping = 8.95;
    this.defaultGSTRate = 3.45;
    this.defaultPSTRate = 2.24;
    this.defaultDiscountPercentage = 20;
    this.state = {
      taxEstimateIsShowing: null,
      postalCode: null,
      postalCodeSubmitted: null,
      postalCodeIsInvalid: false,
      promoCodeFormIsShowing: null,
      promoCode: null,
      promoCodeSubmitted: null,
      promoDiscount: null,
      taxGSTRate: null,
      taxPSTRate: null,
      pickupInStore: false,
      focusedFormId: null,
    };
  }

  componentDidMount() {
    const { bagItemsInfo } = this.props;
    this.setBagItemsCost(bagItemsInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    const { bagItemsInfo } = this.props;
    if (prevProps.bagItemsInfo !== bagItemsInfo) {
      this.setBagItemsCost(bagItemsInfo);
    }

    const {
      isShippingFree, pickupInStore, postalCodeSubmitted, promoCodeSubmitted,
    } = this.state;
    if ((prevProps.bagItemsInfo !== bagItemsInfo)
    || (prevState.isShippingFree !== isShippingFree)
    || (prevState.pickupInStore !== pickupInStore)
    || (prevState.postalCodeSubmitted !== postalCodeSubmitted)
    || (prevState.promoCodeSubmitted !== promoCodeSubmitted)) {
      this.calculateTotalCost();
    }
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
    const { pickupInStore } = this.state;
    this.setState({
      pickupInStore: !pickupInStore,
    });
  }

  setBagItemsCost(bagItemsInfo) {
    const bagCost = bagItemsInfo
      .map(bagItem => bagItem.cost)
      .reduce((sum, current) => sum + parseFloat(current.slice(1)), 0);
    this.setState({
      bagItemsCost: bagCost,
      isShippingFree: bagCost > this.freeShippingThreshold,
    });
  }

  fakeValidatePostalCode(postalCode) {
    return /\d/.test(postalCode);
  }

  submitPostalCode(e) {
    e.preventDefault();
    const { postalCode } = this.state;
    if (postalCode === null) return;
    if (this.fakeValidatePostalCode(postalCode)) {
      this.setState({
        postalCodeIsInvalid: false,
        postalCodeSubmitted: postalCode,
        taxGSTRate: this.defaultGSTRate,
        taxPSTRate: this.defaultPSTRate,
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
    if (promoCode === null) return;
    this.setState({
      promoCodeSubmitted: promoCode,
      promoDiscount: this.defaultDiscountPercentage,
      promoCodeFormIsShowing: false,
    });
    document.activeElement.blur();
  }

  removePromoCode() {
    this.setState({
      promoCodeSubmitted: null,
    });
  }

  toggleTaxEstimationVisibility() {
    const { taxEstimateIsShowing } = this.state;
    this.setState({
      promoCodeFormIsShowing: false,
      taxEstimateIsShowing: !taxEstimateIsShowing,
    });
  }

  togglePromoCodeFormVisibility() {
    const { promoCodeFormIsShowing, postalCodeSubmitted } = this.state;
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

  calculateTotalCost() {
    const {
      bagItemsCost, promoDiscount, taxGSTRate, taxPSTRate, isShippingFree, pickupInStore,
    } = this.state;
    const totalCost = bagItemsCost * (1 - promoDiscount / 100) // apply discount
    * (1 + (taxGSTRate + taxPSTRate) / 100) // apply tax
    + (isShippingFree || pickupInStore ? 0 : this.defaultShipping); // apply shipping cost
    this.setState({
      totalCost: Math.round(totalCost * 100) / 100,
    });
  }

  renderTaxCost() {
    const { bagItemsCost, taxGSTRate, taxPSTRate } = this.state;
    return (
      <div className="Tax-costs-container">
        <div className="Tax-cost-container">
          <p>GST:</p>
          <p>
            {Math.round(bagItemsCost * taxGSTRate) / 100}
            $
          </p>
        </div>
        <div className="Tax-cost-container">
          <p>PST:</p>
          <p>
            {Math.round(bagItemsCost * taxPSTRate) / 100}
            $
          </p>
        </div>
      </div>
    );
  }

  renderTaxEstimateContainer() {
    const {
      taxEstimateIsShowing, postalCodeSubmitted, postalCodeIsInvalid, postalCode, focusedFormId,
    } = this.state;
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
    const { isShippingFree, focusedFormId } = this.state;
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
              {isShippingFree && <span className="Ship-to-address-free">Free</span>}
              {`$${this.defaultShipping}`}
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
    const {
      promoDiscount, bagItemsCost, promoCodeSubmitted, focusedFormId,
    } = this.state;
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
      promoCodeFormIsShowing, promoCode, focusedFormId, promoCodeSubmitted,
    } = this.state;
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
    const {
      bagItemsCost, promoCodeSubmitted, isShippingFree,
      totalCost, focusedFormId,
    } = this.state;
    const fadedClass = focusedFormId ? 'Faded' : 'Unfaded';

    return (
      <div className="Bill-summary">
        <div>
          <div className={`Shipping-cost-status-container ${fadedClass}`}>
            <div className="Bullet-point-shipping-cost" />
            <p>
              {isShippingFree ? "YOU'VE QUALIFIED FOR FREE SHIPPING"
                : `YOU'RE $${this.freeShippingThreshold - bagItemsCost} AWAY FROM FREE SHIPPING` }
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
        <div>
          <div className="Total-cost-container">
            <p className="Total-cost-label">Subtotal:</p>
            <p className="Total-cost-value">{`$${totalCost}`}</p>
          </div>
          <Button
            buttonText="Checkout now"
            buttonTextClassName="Checkout-button-text"
            className="Checkout-button Bill-summary-button"
          />
        </div>
      </div>
    );
  }
}

BillSummary.defaultProps = {
  bagItemsInfo: null,
};

BillSummary.propTypes = {
  bagItemsInfo: PropTypes.arrayOf(PropTypes.object),
};


export default BillSummary;
