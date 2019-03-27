import React from 'react';
import PropTypes from 'prop-types';
import BagContainer from '../../container/Bag/Bag';
import Loader from '../../components/Loader/Loader';
import BillSummaryContainer from '../../container/BillSummary/BillSummary';
import './Bag.css';
import dropdownArrowIcon from '../../assets/icons/dropdownArrow.svg';
import CheckoutContainer from '../../container/CheckoutOverview/CheckoutOverview';
import Button from '../../components/Button/Button';

class BagPage extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { checkoutViewActive } = this.props;
    if (prevProps.checkoutViewActive !== checkoutViewActive) {
      this.setElementPosition();
    }
  }

  setElementPosition() {
    const { checkoutViewActive } = this.props;
    const bagWrapper = document.getElementById('bag-wrapper');
    const bagWrapperHeight = bagWrapper.offsetHeight;
    const checkoutContainer = document.getElementById('checkout-container');
    if (checkoutViewActive) {
      checkoutContainer.style.transform = `translate(0, -${bagWrapperHeight + parseFloat(getComputedStyle(bagWrapper).marginTop)}px)`;
      bagWrapper.style.transform = `translate(0, -${bagWrapperHeight + 10 + parseFloat(getComputedStyle(bagWrapper).marginTop)}px)`;
    } else {
      checkoutContainer.style.transform = 'translate(0, 0px)';
      bagWrapper.style.transform = 'translate(0, 0px)';
    }
  }

  render() {
    const { isFetching, setCheckoutView, checkoutViewActive } = this.props;
    const toggleViewClass = checkoutViewActive ? 'Checkout-view' : 'Bag-view';
    return (
      <div className="Bag-page">
        {isFetching && <Loader />}
        {!isFetching
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
              <Button
                buttonIcon={dropdownArrowIcon}
                iconClassName="Back-to-bag-icon"
                className={`Transparent-button Back-to-bag ${toggleViewClass}`}
                buttonText="Back to bag"
                onClick={() => setCheckoutView(false)}
              />
              <div className="Bag-and-checkout-wrapper">
                <div id="bag-wrapper" className={`Bag-wrapper ${toggleViewClass}`}>
                  <BagContainer />
                </div>
                <div id="checkout-container" className={`Checkout-container ${toggleViewClass}`}>
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
  setCheckoutView: null,
};

BagPage.propTypes = {
  isFetching: PropTypes.bool,
  checkoutViewActive: PropTypes.bool,
  setCheckoutView: PropTypes.func,
};


export default BagPage;
