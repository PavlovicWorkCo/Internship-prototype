import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BillSummaryForm from './BillSummaryForm';
import Button from '../Button/Button';
import expandArrow from '../../assets/icons/dropdownArrow.svg';

class PromoCodeDropdown extends React.PureComponent {
  render() {
    const {
      promoCodeSubmitted, onBillSummaryInputFocusToggle, focusedFormId,
      togglePromoCodeFormVisibility, promoCodeFormIsShowing, submitPromoCode,
      onPromoCodeChange, promoCode, formId,
    } = this.props;
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
      Collapsed: !promoCodeFormIsShowing,
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
          onClick={() => togglePromoCodeFormVisibility()}
        />
        <BillSummaryForm
          formContainerClassName={promoCodeFormContainerClass}
          formId={formId}
          onSubmit={e => submitPromoCode(e)}
          inputPlaceholderText="Enter promo Code"
          inputClassName="Postal-code-input Default-input"
          inputContainerClassName="Postal-code-input-container"
          onInputChange={e => onPromoCodeChange(e)}
          buttonText="Apply"
          buttonClass={promoCodeButtonClass}
          onInputFocus={() => onBillSummaryInputFocusToggle(formId)}
          onInputBlur={() => onBillSummaryInputFocusToggle(null)}
        />
      </div>
    );
  }
}

PromoCodeDropdown.defaultProps = {
  promoCodeSubmitted: null,
  onBillSummaryInputFocusToggle: null,
  focusedFormId: null,
  submitPromoCode: null,
  togglePromoCodeFormVisibility: null,
  promoCodeFormIsShowing: null,
  onPromoCodeChange: null,
  promoCode: null,
  formId: null,
};

PromoCodeDropdown.propTypes = {
  promoCodeSubmitted: PropTypes.string,
  onBillSummaryInputFocusToggle: PropTypes.func,
  focusedFormId: PropTypes.string,
  submitPromoCode: PropTypes.func,
  togglePromoCodeFormVisibility: PropTypes.func,
  promoCodeFormIsShowing: PropTypes.bool,
  onPromoCodeChange: PropTypes.func,
  promoCode: PropTypes.string,
  formId: PropTypes.string,
};

export default PromoCodeDropdown;
