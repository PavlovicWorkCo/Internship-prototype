import { connect } from 'react-redux';
import BillSummary from '../../components/BillSummary/BillSummary';
import {
  goToCheckout, submitPromoCode, submitPostalCode, togglePickupInStore,
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
});

const mapDispatchToProps = dispatch => (
  {
    goToCheckout: () => { dispatch(goToCheckout()); },
    submitPromoCode: (code) => { dispatch(submitPromoCode(code)); },
    submitPostalCode: (code) => { dispatch(submitPostalCode(code)); },
    togglePickupInStore: () => { dispatch(togglePickupInStore()); },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(BillSummary);
