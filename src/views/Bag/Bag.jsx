import React from 'react';
import PropTypes from 'prop-types';
import BagContainer from '../../container/Bag/Bag';
import Loader from '../../components/Loader/Loader';
import BillSummaryContainer from '../../container/BillSummary/BillSummary';
import './Bag.css';
import dropdownArrowIcon from '../../assets/icons/dropdownArrow.svg';
import CheckoutContainer from '../../container/CheckoutOverview/CheckoutOverview';

class BagPage extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { checkoutViewActive } = this.props;
    if (prevProps.checkoutViewActive !== checkoutViewActive) {
      this.setElementPosition();
    }
  }

  setElementPosition() {
    const bagContainer = document.getElementById('bag-container');
    const bagContainerHeight = bagContainer.offsetHeight;
    bagContainer.style.transform = `translate(0, -${bagContainerHeight + parseFloat(getComputedStyle(bagContainer).marginTop)}px)`;

    const checkoutContainer = document.getElementById('checkout-container');
    checkoutContainer.style.transform = `translate(0, -${bagContainerHeight + parseFloat(getComputedStyle(bagContainer).marginTop)}px)`;
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="Bag-page">
        {isFetching === true && <Loader />}
        {isFetching === false
          && (
            <React.Fragment>
              <a className="Back-to-addition-link" href="/">
                <img
                  alt=""
                  src={dropdownArrowIcon}
                  className="Back-to-addition-arrow"
                />
                ADDITION ELLE
              </a>
              <div className="Bag-and-checkout-wrapper">
                <div id="bag-container">
                  <BagContainer />
                </div>
                <div id="checkout-container">
                  <CheckoutContainer />
                </div>
              </div>
              <BillSummaryContainer />
            </React.Fragment>
          )}
      </div>
    );
  }
}

BagPage.defaultProps = {
  isFetching: null,
  checkoutViewActive: null,
};

BagPage.propTypes = {
  isFetching: PropTypes.bool,
  checkoutViewActive: PropTypes.bool,
};


export default BagPage;
