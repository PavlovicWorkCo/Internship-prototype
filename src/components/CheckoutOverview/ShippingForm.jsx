import React from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import { defaultShippingCost } from '../../helper/costChangers';

class ShippingForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: { shippingCountry: 'Canada', storeProvince: null, storeCity: null }, // default country(and for now the only one)
      informationIsIncomplete: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { pickupInStore } = this.props;
    if (prevProps.pickupInStore !== pickupInStore) {
      this.resetInformationIsIncomplete();
    }
  }

  onInputChange(e, inputName) {
    const { formValues, informationIsIncomplete } = this.state;
    const newFormValues = { ...formValues, [`${inputName}`]: e.target.value };
    if (informationIsIncomplete) {
      this.setState({
        formValues: newFormValues,
        informationIsIncomplete: false,
      });
    } else {
      this.setState({
        formValues: newFormValues,
      });
    }
  }

  onPostalCodeBlur(e) {
    if (!this.fakeValidatePostalCode(e.target.value)) return;
    const { formValues } = this.state;
    this.setState({
      formValues: { ...formValues, storeProvince: 'British Colombia', storeCity: 'Vancuver' },
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { formValues } = this.state;
    const {
      submitShippingForm, setEditingFormRef, submitPostalCode, heightAnimationTime,
    } = this.props;
    // submitPostalCode('11000');
    // submitShippingForm({
    //   shippingCountry: 'Canada', shippingProvince: 'srb', shippingCity: 'bg',
    // shippingAddress: 'cara dus 23', phoneNumber: '2323123', fistName: 'pera',
    // lastName: 'peric', shippingPostalCode: '11000',
    // });
    if (this.isInformationIncomplete()) {
      this.setState({
        informationIsIncomplete: true,
      });
      return;
    }
    //
    this.setState({
      informationIsIncomplete: false,
    });
    submitPostalCode(formValues.shippingPostalCode);
    submitShippingForm(formValues);
    setEditingFormRef(null);
    scroll.scrollTo(185, {
      duration: heightAnimationTime,
      containerId: 'checkout-container',
    });
    // top padding of checkoutcontainer is 55px + Email overview heigth is 130px
  }

  setStoreCity(city) {
    // here we would check what provice the city is in
    this.setState({
      formValues: {
        storeProvince: 'British Columbia',
        storeCity: city,
      },
    });
  }

  resetInformationIsIncomplete() {
    this.setState({
      informationIsIncomplete: false,
    });
  }

  isInformationIncomplete() {
    const { formValues } = this.state;
    const { pickupInStore } = this.props;
    const {
      firstName, lastName, shippingAddress, shippingCity, shippingPostalCode,
      shippingProvince, phoneNumber,
    } = formValues;
    if (!pickupInStore && (!firstName || !lastName || !shippingAddress || !shippingCity
      || !shippingPostalCode || !shippingProvince || !phoneNumber)) {
      return true;
    }
    if (pickupInStore && (!firstName || !lastName || !phoneNumber
      || !shippingPostalCode)) {
      return true;
    }
    return false;
  }

  fakeValidatePostalCode(postalCode) {
    return /\d/.test(postalCode);
  }

  renderShippingToAddressInputs() {
    const { formValues } = this.state;
    return (
      <React.Fragment>
        <Input
          containerClassName="Checkout-big-text-input"
          placeholderText="Address"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'shippingAddress')}
          defaultValue={formValues.shippingAddress}

        />
        <Input
          containerClassName="Checkout-big-text-input"
          placeholderText="Apartment, suit, etc(optional)"
          inputLabelText="Address"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'shippingAddressApartment')}
          defaultValue={formValues.shippingAddressApartment}

        />
        <Input
          containerClassName="Checkout-small-text-input"
          placeholderText="City"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'shippingCity')}
          defaultValue={formValues.shippingCity}
        />
        <Input
          containerClassName="Checkout-small-text-input"
          placeholderText="Province"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'shippingProvince')}
          defaultValue={formValues.shippingProvince}

        />
        <Input
          containerClassName="Checkout-small-text-input"
          placeholderText="Postal code"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'shippingPostalCode')}
          defaultValue={formValues.shippingPostalCode}
          onBlur={e => this.onPostalCodeBlur(e)}

        />
        <Dropdown
          dropdownContainerClass="Dropdown-container-test Shipping-country-dropdown"
          dropdownButtonClass="Dropdown-button-test Shipping-country-dropdown-button"
          optionsButtonClass="Dropdown-options-button-test"
          dropdownLabeled
          labelClass="Standard-input-label"
          dropdownOptions={['Canada']}
          placeholderText="Country"
          dropdownOptionsContainerClass="Dropdown-options-container-test Shipping-country-dropdown-options-container"
          dropdownArrowIconClass="Dropdown-arrow-icon-test"
          dropdownArrowVisible
          dropdownType="standalone-dropdown"
          defaultSelected="Canada"
        />
      </React.Fragment>
    );
  }

  renderNameWarning() {
    return (
      <p className="Name-warning">
        Please ensure that your first name and last name is identical to a valid ID card.
        The phone number will be used to contact you once your order has been received
        in your selected store.
      </p>
    );
  }

  renderShippingToStoreInputs() {
    const { formValues } = this.state;
    return (
      <React.Fragment>
        <Input
          containerClassName="Checkout-small-text-input"
          placeholderText="Postal code"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'shippingPostalCode')}
          onBlur={e => this.onPostalCodeBlur(e)}
          defaultValue={formValues.shippingPostalCode}
        />
        <Dropdown
          dropdownContainerClass="Dropdown-container-test Shipping-country-dropdown"
          dropdownButtonClass="Dropdown-button-test Shipping-country-dropdown-button"
          optionsButtonClass="Dropdown-options-button-test"
          dropdownLabeled
          labelClass="Standard-input-label"
          dropdownOptions={['50 Km', '100 Km', '200 Km']}
          placeholderText="Radius"
          dropdownOptionsContainerClass="Dropdown-options-container-test Shipping-country-dropdown-options-container"
          dropdownArrowIconClass="Dropdown-arrow-icon-test"
          dropdownArrowVisible
          dropdownType="standalone-dropdown"
          defaultSelected="50 Km"
        />
        <Dropdown
          dropdownContainerClass="Dropdown-container-test Shipping-country-dropdown"
          dropdownButtonClass="Dropdown-button-test Shipping-country-dropdown-button"
          optionsButtonClass="Dropdown-options-button-test"
          dropdownLabeled
          labelClass="Standard-input-label"
          dropdownOptions={['British Columbia']}
          placeholderText="Province"
          dropdownOptionsContainerClass="Dropdown-options-container-test Shipping-country-dropdown-options-container"
          dropdownArrowIconClass="Dropdown-arrow-icon-test"
          dropdownArrowVisible
          dropdownType="standalone-dropdown"
          defaultSelected={formValues.storeProvince}
        />
        <Dropdown
          dropdownContainerClass="Dropdown-container-test Shipping-country-dropdown"
          dropdownButtonClass="Dropdown-button-test Shipping-country-dropdown-button"
          optionsButtonClass="Dropdown-options-button-test"
          dropdownLabeled
          labelClass="Standard-input-label"
          dropdownOptions={['Vancuver']}
          placeholderText="City"
          dropdownOptionsContainerClass="Dropdown-options-container-test Shipping-country-dropdown-options-container"
          dropdownArrowIconClass="Dropdown-arrow-icon-test"
          dropdownArrowVisible
          dropdownType="standalone-dropdown"
          defaultSelected={formValues.storeCity}
          setInputValue={option => this.setStoreCity(option)}
        />
      </React.Fragment>
    );
  }

  render() {
    const { informationIsIncomplete } = this.state;
    const { pickupInStore } = this.props;
    return (
      <form className="Checkout-shipping-form">
        { pickupInStore && this.renderNameWarning()}
        <Input
          containerClassName="Checkout-small-text-input"
          placeholderText="First name"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'firstName')}

        />
        <Input
          containerClassName="Checkout-small-text-input"
          placeholderText="Last name"
          inputLabeled
          inputClassName="Default-input Checkout-input-size"
          onChange={e => this.onInputChange(e, 'lastName')}

        />
        { !pickupInStore && this.renderShippingToAddressInputs()}

        <Input
          containerClassName="Checkout-big-text-input"
          placeholderText="Phone number"
          inputClassName="Default-input Checkout-input-size"
          inputLabeled
          onChange={e => this.onInputChange(e, 'phoneNumber')}
        />
        {pickupInStore && this.renderShippingToStoreInputs()}
        {!pickupInStore && (
          <React.Fragment>
            <p className="Required-info">Why is it required?</p>
            <div className="Shipping-info">
              <div>
                <p className="Shipping-type">Standard shipping</p>
                <p className="Shipping-time">5 - 7 business days</p>
              </div>
              <p>{`$${defaultShippingCost}`}</p>
            </div>
          </React.Fragment>
        )}
        <div className="Continue-to-payment-wrapper">
          <Button className="Checkout-button Continue-to-payment-button" buttonText="Continue to payment method" onClick={e => this.onFormSubmit(e)} />
          {informationIsIncomplete && <div className="Incomplete-info-warning">Please enter all required information.</div>}
        </div>
      </form>
    );
  }
}

ShippingForm.defaultProps = {
  submitShippingForm: null,
  setEditingFormRef: null,
  pickupInStore: null,
  submitPostalCode: null,
  heightAnimationTime: null,
};

ShippingForm.propTypes = {
  submitShippingForm: PropTypes.func,
  setEditingFormRef: PropTypes.func,
  pickupInStore: PropTypes.bool,
  submitPostalCode: PropTypes.func,
  heightAnimationTime: PropTypes.number,
};

export default ShippingForm;
