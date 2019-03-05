import { connect } from 'react-redux';
import CheckoutOverview from '../../components/CheckoutOverview/CheckoutOverview';
import { goToCheckout } from '../../redux/actions'; // unnecessary??

const mapStateToProps = state => ({
  bagItemsInfo: state.bagItems.items,
  errorMsg: state.bagItems.errorType,
  checkoutViewActive: state.checkoutView, // unnecessary??
});

const mapDispatchToProps = dispatch => (
  {
    goToCheckout: () => { dispatch(goToCheckout()); }, // unnecessary??
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOverview);
