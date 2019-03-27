import { connect } from 'react-redux';
import CheckoutOverview from '../../components/CheckoutOverview/CheckoutOverview';
import {
  submitEmail, setCheckoutView, submitShippingForm, setPickupInStore,
  submitPaymentMethod, submitPostalCode, deleteBagItem,
} from '../../redux/actions'; // goToCheckout unnecessary??

const mapStateToProps = state => ({
  bagItemsInfo: state.bagItems.items,
  bagItemsCost: state.bagItems.bagItemsCost,
  bagItemsGSTTax: state.bagItems.gstTax,
  bagItemsPSTTax: state.bagItems.pstTax,
  errorMsg: state.bagItems.errorType,
  checkoutViewActive: state.checkoutView, // unnecessary??
  loggedInMail: state.checkoutReducer.loggedInMail,
  shippingFormSubmitted: state.checkoutReducer.shippingFormSubmitted,
  pickupInStore: state.bagItems.pickupInStore,
  paymentMethodSubmitted: state.checkoutReducer.paymentMethodSubmitted,
  isShippingToAddressFree: state.bagItems.isShippingToAddressFree,
  totalCost: state.bagItems.totalCost,
});

const mapDispatchToProps = dispatch => (
  {
    setCheckoutView: (value) => { dispatch(setCheckoutView(value)); }, // unnecessary??
    submitEmail: (email) => { dispatch(submitEmail(email)); },
    submitShippingForm: (formValuesObj) => { dispatch(submitShippingForm(formValuesObj)); },
    submitPostalCode: (postalCode) => { dispatch(submitPostalCode(postalCode)); },
    setPickupInStore: (boolValue) => { dispatch(setPickupInStore(boolValue)); },
    submitPaymentMethod: (formValuesObj) => { dispatch(submitPaymentMethod(formValuesObj)); },
    deleteBagItem: (index) => { dispatch(deleteBagItem(index)); },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOverview);
