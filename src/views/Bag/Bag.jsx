import React from 'react';
import PropTypes from 'prop-types';
import BagContainer from '../../container/Bag/Bag';
import Loader from '../../components/Loader/Loader';
import BillSummaryContainer from '../../container/BillSummary/BillSummary';
import './Bag.css';

const BagPage = (props) => {
  const { isFetching } = props;
  return (
    <div className="Bag-page">
      {isFetching === true && <Loader />}
      {isFetching === false
        && (
          <React.Fragment>
            <BagContainer {...props} />
            <BillSummaryContainer />
          </React.Fragment>
        )}
    </div>
  );
};

BagPage.defaultProps = {
  isFetching: null,
};

BagPage.propTypes = {
  isFetching: PropTypes.bool,
};


export default BagPage;
