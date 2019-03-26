import { connect } from 'react-redux';
import Bag from '../../components/Bag/Bag';
import { deleteBagItem, setItemQuantity } from '../../redux/actions';

const mapStateToProps = state => ({
  bagItemsInfo: state.bagItems.items,
  errorMsg: state.bagItems.errorType,
});

const mapDispatchToProps = dispatch => (
  {
    deleteBagItem: (index) => { dispatch(deleteBagItem(index)); },
    setItemQuantity: (quantity, itemIndex) => { dispatch(setItemQuantity(quantity, itemIndex)); },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(Bag);
