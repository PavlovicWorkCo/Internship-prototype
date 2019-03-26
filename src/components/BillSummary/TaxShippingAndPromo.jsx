import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BillSummaryForm from './BillSummaryForm';
import RadioInput from '../RadioInput/RadioInput';
import Button from '../Button/Button';
import expandArrow from '../../assets/icons/dropdownArrow.svg';
import PromoCodeResults from './PromoCodeResults';
import { defaultShippingCost } from '../../helper/costChangers';
import PromoCodeDropdown from './PromoCodeDropdown';

class TaxShippingAndPromo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taxEstimateIsShowing: null,
      postalCode: null,
      postalCodeIsInvalid: false,
      promoCodeFormIsShowing: null,
      promoCode: null,
    };
  }

  onPostalCodeChange(e) {
    this.setState({
      postalCode: e.target.value,
      postalCodeIsInvalid: false,
    });
  }

  onPromoCodeChange(e) {
    this.setState({
      promoCode: e.target.value,
    });
  }

  onShippingOptionChange(pickupInStoreString) {
    const pickupInStoreBool = pickupInStoreString === 'true';
    const { setPickupInStore, submitShippingForm } = this.props;
    setPickupInStore(pickupInStoreBool);
    submitShippingForm(null);
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
      // this validation only checks if it contains numbers
      submitPostalCode(postalCode);
      this.setState({
        postalCodeIsInvalid: false,
      });
      document.activeElement.blur();
      // blur the current input so the elements are not faded anymore after submit.
      // It is not done automatically on submit probably
      // because the input disapears before it can blur
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
    if (!promoCode) return;
    submitPromoCode(promoCode);
    this.setState({
      promoCodeFormIsShowing: false,
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
    const { postalCodeSubmitted, onBillSummaryInputFocusToggle, focusedFormId } = this.props;
    const {
      taxEstimateIsShowing, postalCodeIsInvalid, postalCode,
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
      Collapsed: !taxEstimateIsShowing,
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
              onInputChange={e => this.onPostalCodeChange(e)}
              buttonText="Estimate"
              buttonClass={postalCodeButtonClass}
              onInputFocus={() => onBillSummaryInputFocusToggle(formId)}
              onInputBlur={() => onBillSummaryInputFocusToggle(null)}
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
    const {
      isShippingToAddressFree, focusedFormId, pickupInStore,
    } = this.props;
    const fadedClass = focusedFormId ? 'Faded' : 'Unfaded';
    return (
      <div className={`Shipping-options-container ${fadedClass}`}>
        <p>Shipping options</p>
        <form onChange={e => this.onShippingOptionChange(e.target.value)} className="Shipping-form">
          <div>
            <RadioInput
              inputId="ship-to-adress"
              name="shipping-option"
              radioLabelText="To an address"
              isChecked={!pickupInStore}
              value={false}
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
              isChecked={pickupInStore}
              value
            />
            <p>Free</p>
          </div>
        </form>
      </div>
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

  renderPromoCodeContainer() {
    const { promoCodeSubmitted, onBillSummaryInputFocusToggle, focusedFormId } = this.props;
    const {
      promoCodeFormIsShowing,
      promoCode,
    } = this.state;

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
        formId="promo-code-form-bag"
      />
    );
  }

  render() {
    const { promoCodeSubmitted } = this.props;
    return (
      <React.Fragment>
        {this.renderTaxEstimateContainer()}
        {this.renderShippingOptions()}
        {promoCodeSubmitted && this.renderPromoCodeResult()}
        {this.renderPromoCodeContainer()}
      </React.Fragment>
    );
  }
}

TaxShippingAndPromo.defaultProps = {
  bagItemsCost: null,
  promoCodeSubmitted: null,
  isShippingToAddressFree: null,
  promoDiscount: null,
  postalCodeSubmitted: null,
  gstTax: null,
  pstTax: null,
  setPickupInStore: null,
  submitPromoCode: null,
  submitPostalCode: null,
  onBillSummaryInputFocusToggle: null,
  focusedFormId: null,
  submitShippingForm: null,
  pickupInStore: false,
};

TaxShippingAndPromo.propTypes = {
  bagItemsCost: PropTypes.number,
  promoCodeSubmitted: PropTypes.string,
  isShippingToAddressFree: PropTypes.bool,
  promoDiscount: PropTypes.number,
  postalCodeSubmitted: PropTypes.string,
  gstTax: PropTypes.number,
  pstTax: PropTypes.number,
  setPickupInStore: PropTypes.func,
  submitPromoCode: PropTypes.func,
  submitPostalCode: PropTypes.func,
  onBillSummaryInputFocusToggle: PropTypes.func,
  focusedFormId: PropTypes.string,
  submitShippingForm: PropTypes.func,
  pickupInStore: PropTypes.bool,
};

export default TaxShippingAndPromo;
