import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import { animateScroll as scroll } from 'react-scroll';
import classNames from 'classnames';
import FormLabel from './FormLabel';
import Button from '../Button/Button';
import ShippingForm from './ShippingForm';
import './ShippingFormContainer.css';

class ShippingFormContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.formRef = React.createRef();
  }

  onEditShippingClick() {
    const { setEditingFormRef } = this.props;
    setEditingFormRef(this.formRef);
  }

  scrollToNextForm() {
    const { editingFormRef, heightAnimationTime } = this.props;
    if (editingFormRef === this.formRef.current) {
      // top padding of checkoutcontainer is 55px + EmailForm height is 130;
      scroll.scrollTo(185, {
        smooth: 'easeInOutQuad',
        duration: heightAnimationTime,
        containerId: 'checkout-container',
      });
    }
  }

  renderShippingOptionsButtons() {
    const { pickupInStore, setPickupInStore } = this.props;
    const shipToStoreButtonClass = classNames({
      'Light-button Checkout-light-button': true,
      Active: pickupInStore,
    });
    const shipToAddressButtonClass = classNames({
      'Light-button Checkout-light-button': true,
      Active: !pickupInStore,
    });
    return (
      <div className="Checkout-shipping-options-container">
        <Button buttonText="Ship to store" className={shipToStoreButtonClass} onClick={() => setPickupInStore(true)} />
        <Button buttonText="Ship to address" className={shipToAddressButtonClass} onClick={() => setPickupInStore(false)} />
      </div>
    );
  }

  renderShippingInputs() {
    const {
      submitShippingForm, setEditingFormRef, submitPostalCode, pickupInStore, heightAnimationTime,
    } = this.props;
    return (
      <ShippingForm
        submitShippingForm={submitShippingForm}
        setEditingFormRef={setEditingFormRef}
        submitPostalCode={submitPostalCode}
        pickupInStore={pickupInStore}
        heightAnimationTime={heightAnimationTime}
      />
    );
  }

  render() {
    const {
      shippingFormSubmitted, isExpanded, editingFormRef, heightAnimationTime, pickupInStore,
    } = this.props;
    const contentHeight = isExpanded || editingFormRef === this.formRef.current ? 'auto' : 0;

    const overviewHeight = editingFormRef !== this.formRef.current ? 'auto' : 0;
    const editButtonHidden = editingFormRef === this.formRef.current || isExpanded || !shippingFormSubmitted ? 'Hidden' : '';

    return (
      <div className="Checkout-shipping-form-container" ref={this.formRef}>
        <FormLabel formNumber="2" formLabel="Shipping to" />
        <Button
          className={`Transparent-button Checkout-form-edit-button ${editButtonHidden}`}
          buttonText="Edit"
          onClick={() => this.onEditShippingClick()}
        />
        <div className="Checkout-shipping-form-content-wrapper">
          { !pickupInStore && shippingFormSubmitted && !isExpanded && (
            <AnimateHeight duration={heightAnimationTime} height={overviewHeight} animateOpacity>
              <div className="Shipping-address-overview">
                {`${shippingFormSubmitted.firstName} ${shippingFormSubmitted.lastName}`}
                <br />
                {`${shippingFormSubmitted.shippingAddress}`}
                {shippingFormSubmitted.shippingAddressApartment && `, ${shippingFormSubmitted.shippingAddressApartment}`}
                <br />
                {`${shippingFormSubmitted.shippingPostalCode},${shippingFormSubmitted.shippingCity},
                ${shippingFormSubmitted.shippingProvince},${shippingFormSubmitted.shippingCountry}`}
                <br />
              </div>
            </AnimateHeight>
          )}
          {pickupInStore && shippingFormSubmitted && !isExpanded && (
            <AnimateHeight duration={heightAnimationTime} height={overviewHeight} animateOpacity>
              <div className="Shipping-address-overview">
                {`${shippingFormSubmitted.firstName} ${shippingFormSubmitted.lastName}`}
                <br />
                {`${shippingFormSubmitted.shippingPostalCode},${shippingFormSubmitted.storeCity},
                ${shippingFormSubmitted.storeProvince}`}
                <br />
              </div>
            </AnimateHeight>
          )}
          <AnimateHeight
            duration={heightAnimationTime}
            height={contentHeight}
            animateOpacity
            onAnimationStart={() => this.scrollToNextForm()}
          >
            <React.Fragment>
              {this.renderShippingOptionsButtons()}
              {this.renderShippingInputs()}
            </React.Fragment>
          </AnimateHeight>
        </div>
      </div>
    );
  }
}

ShippingFormContainer.defaultProps = {
  submitShippingForm: null,
  shippingFormSubmitted: false,
  isExpanded: false,
  editingFormRef: null,
  setEditingFormRef: null,
  setPickupInStore: null,
  pickupInStore: null,
  submitPostalCode: null,
  heightAnimationTime: null,
};

ShippingFormContainer.propTypes = {
  submitShippingForm: PropTypes.func,
  shippingFormSubmitted: PropTypes.object,
  isExpanded: PropTypes.bool,
  editingFormRef: PropTypes.object,
  setEditingFormRef: PropTypes.func,
  setPickupInStore: PropTypes.func,
  pickupInStore: PropTypes.bool,
  submitPostalCode: PropTypes.func,
  heightAnimationTime: PropTypes.number,
};

export default ShippingFormContainer;
