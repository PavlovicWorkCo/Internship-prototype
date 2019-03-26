import React from 'react';
import PropTypes from 'prop-types';
import './CheckoutOverview.css';
import FormLabel from './FormLabel';
import EmailForm from './EmailForm';
import ShippingFormContainer from './ShippingFormContainer';
import PaymentForm from './PaymentForm';
import ReviewAndFinish from './ReviewAndFinish';

class CheckoutOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editingFormRef: null,
    };
  }

  setEditingFormRef(ref) {
    const currentRef = ref ? ref.current : null;
    this.setState({
      editingFormRef: currentRef,
    });
  }

  renderCheckoutPhaseLabel(phaseNumber, label) {
    return (
      <div className="Checkout-phase-label">
        <p>{phaseNumber}</p>
        <p className="Phase-label-name">{label}</p>
      </div>
    );
  }

  renderPaymentForm() {
    return (
      <div className="Checkout-payment-form-container">
        <FormLabel formNumber="3" formLabel="Payment method" />
      </div>
    );
  }

  render() {
    const {
      submitEmail, loggedInMail, submitShippingForm, shippingFormSubmitted,
      submitPostalCode, pickupInStore, setPickupInStore, paymentMethodSubmitted,
      submitPaymentMethod, bagItemsInfo, bagItemsCost, bagItemsGSTTax,
      bagItemsPSTTax, isShippingToAddressFree, totalCost, deleteBagItem,
    } = this.props;
    const { editingFormRef } = this.state;
    // a form is expanded if the previous forms are submitted and there is no form edited.
    // if a form is edited the expansion is handled in the form/component
    const emailExpanded = !loggedInMail && !editingFormRef;
    const shippingExpanded = loggedInMail && !shippingFormSubmitted && !editingFormRef;
    const paymentExpanded = loggedInMail && shippingFormSubmitted
    && !paymentMethodSubmitted && !editingFormRef;
    const reviewExpanded = loggedInMail && shippingFormSubmitted
    && paymentMethodSubmitted && !editingFormRef;
    const heightAnimationTime = loggedInMail ? 400 : 0;
    return (
      <React.Fragment>
        <EmailForm
          isExpanded={emailExpanded}
          submitEmail={submitEmail}
          loggedInMail={loggedInMail}
          setEditingFormRef={ref => this.setEditingFormRef(ref)}
          editingFormRef={editingFormRef}
          heightAnimationTime={heightAnimationTime}
        />
        <ShippingFormContainer
          isExpanded={shippingExpanded}
          submitShippingForm={submitShippingForm}
          shippingFormSubmitted={shippingFormSubmitted}
          setEditingFormRef={ref => this.setEditingFormRef(ref)}
          editingFormRef={editingFormRef}
          pickupInStore={pickupInStore}
          setPickupInStore={setPickupInStore}
          submitPostalCode={submitPostalCode}
          heightAnimationTime={heightAnimationTime}
        />
        <PaymentForm
          isExpanded={paymentExpanded}
          submitPaymentMethod={submitPaymentMethod}
          paymentMethodSubmitted={paymentMethodSubmitted}
          setEditingFormRef={ref => this.setEditingFormRef(ref)}
          editingFormRef={editingFormRef}
          shippingFormSubmitted={shippingFormSubmitted}
          heightAnimationTime={heightAnimationTime}
        />
        <ReviewAndFinish
          isExpanded={reviewExpanded}
          setEditingFormRef={ref => this.setEditingFormRef(ref)}
          editingFormRef={editingFormRef}
          bagItemsInfo={bagItemsInfo}
          bagItemsCost={bagItemsCost}
          taxGST={bagItemsGSTTax}
          taxPST={bagItemsPSTTax}
          isShippingToAddressFree={isShippingToAddressFree}
          pickupInStore={pickupInStore}
          totalCost={totalCost}
          deleteBagItem={deleteBagItem}
          heightAnimationTime={heightAnimationTime}
          shippingFormSubmitted={shippingFormSubmitted}
          paymentMethodSubmitted={paymentMethodSubmitted}
        />
      </React.Fragment>

    );
  }
}
export default CheckoutOverview;

CheckoutOverview.defaultProps = {
  bagItemsInfo: null,
  submitEmail: null,
  loggedInMail: null,
  submitShippingForm: null,
  submitPostalCode: null,
  shippingFormSubmitted: false,
  pickupInStore: null,
  setPickupInStore: null,
  paymentMethodSubmitted: null,
  submitPaymentMethod: null,
  bagItemsCost: null,
  bagItemsGSTTax: null,
  bagItemsPSTTax: null,
  isShippingToAddressFree: null,
  totalCost: null,
  deleteBagItem: null,
};

CheckoutOverview.propTypes = {
  bagItemsInfo: PropTypes.arrayOf(PropTypes.object),
  submitEmail: PropTypes.func,
  loggedInMail: PropTypes.string,
  submitShippingForm: PropTypes.func,
  submitPostalCode: PropTypes.func,
  shippingFormSubmitted: PropTypes.object,
  pickupInStore: PropTypes.bool,
  setPickupInStore: PropTypes.func,
  paymentMethodSubmitted: PropTypes.object,
  submitPaymentMethod: PropTypes.func,
  bagItemsCost: PropTypes.number,
  bagItemsGSTTax: PropTypes.number,
  bagItemsPSTTax: PropTypes.number,
  isShippingToAddressFree: PropTypes.bool,
  totalCost: PropTypes.number,
  deleteBagItem: PropTypes.func,
};
