import { connect } from 'react-redux';
import BillSummary from '../../components/BillSummary/BillSummary';
import {
  setCheckoutView, submitPromoCode, submitPostalCode, setPickupInStore,
  submitShippingForm,
} from '../../redux/actions';

const mapStateToProps = state => ({
  bagItemsInfo: state.bagItems.items,
  errorMsg: state.bagItems.errorType,
  checkoutViewActive: state.checkoutView,
  totalCost: state.bagItems.totalCost,
  promoDiscount: state.bagItems.promoDiscount,
  gstTax: state.bagItems.gstTax,
  pstTax: state.bagItems.pstTax,
  pickupInStore: state.bagItems.pickupInStore,
  isShippingToAddressFree: state.bagItems.isShippingToAddressFree,
  bagItemsCost: state.bagItems.bagItemsCost,
  promoCodeSubmitted: state.bagItems.promoCodeSubmitted,
  postalCodeSubmitted: state.bagItems.postalCodeSubmitted,
  paymentMethodSubmitted: state.checkoutReducer.paymentMethodSubmitted,
  shippingFormSubmitted: state.checkoutReducer.shippingFormSubmitted,
});

const mapDispatchToProps = dispatch => (
  {
    setCheckoutView: (value) => { dispatch(setCheckoutView(value)); },
    submitPromoCode: (code) => { dispatch(submitPromoCode(code)); },
    submitPostalCode: (code) => { dispatch(submitPostalCode(code)); },
    setPickupInStore: (boolValue) => { dispatch(setPickupInStore(boolValue)); },
    submitShippingForm: (value) => { dispatch(submitShippingForm(value)); },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(BillSummary);
