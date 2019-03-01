import { connect } from 'react-redux';
import BillSummary from '../../components/BillSummary/BillSummary';

const mapStateToProps = state => ({
  bagItemsInfo: state.bagItems.items,
  errorMsg: state.bagItems.errorType,
});


export default connect(mapStateToProps, null)(BillSummary);
