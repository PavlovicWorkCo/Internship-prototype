import { connect } from 'react-redux';
import Bag from '../../components/Bag/Bag';

const mapStateToProps = (state) => { // eslint-disable-line arrow-body-style
  return {
    bagItems: state.bagItems.items,
    errorMsg: state.bagItems.errorType,
  };
};


export default connect(mapStateToProps, null)(Bag);
