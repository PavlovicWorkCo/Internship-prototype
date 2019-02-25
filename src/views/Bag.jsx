import React from 'react';
import PropTypes from 'prop-types';
import BagContainer from '../container/Bag/Bag';
import Loader from '../components/Loader/Loader';

const BagPage = (props) => {
  const { isFetching } = props;
  return (
    <div>
      {isFetching === true && <Loader />}
      {isFetching === false && <BagContainer {...props} />}
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
