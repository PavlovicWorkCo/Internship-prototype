/* eslint-disable no-alert, react/jsx-filename-extension, import/no-extraneous-dependencies */
import '../src/index.css';
import '../src/App';
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/components/Button/Button';
import paypalIcon from '../src/assets/icons/paypalButton.svg';
import Input from '../src/components/Input/Input';
import Dropdown from '../src/components/Dropdown/Dropdown';
import Loader from '../src/components/Loader/Loader';
import Bag from '../src/components/Bag/Bag';
import BagData from './Bag-data';
import BillSummary from '../src/components/BillSummary/BillSummary';


storiesOf('Button', module)
  .add('Disabled', () => (
    <Button
      buttonText="Estimate"
      buttonTextClassName="Checkout-button-text"
      className="Checkout-button Disabled-button Test-button-size"
    />
  ))
  .add('Light', () => (
    <Button buttonText="Update Bag" className="Light-button Test-button-size" />
  ))
  .add('Transparent', () => (
    <Button
      buttonText="Log in"
      buttonTextClassName="Transparent-button-text"
      className="Transparent-button Test-button-size"
    />
  ))
  .add('Payment', () => (
    <Button
      buttonIcon={paypalIcon}
      iconClassName="Icon-paypal"
      className="Payment-button Test-button-size"
    />
  ))
  .add('Checkout', () => (
    <Button
      buttonText="Checkout now"
      buttonTextClassName="Checkout-button-text"
      className="Checkout-button Test-button-size"
    />
  ));

storiesOf('Input', module)
  .add('Standard and labeled', () => (
    <Input
      inputLabeled
      inputLabelClassName="Standard-input-label"
      placeholderText="Address"
      inputClassName="Default-input Test-standard-input"
    />
  ))
  .add('Email', () => (
    <Input
      placeholderText="Email"
      inputCheckerType="email"
      inputClassName="Email-input Default-input"
    />
  ))
  .add('Password', () => (
    <Input
      inputType="password"
      placeholderText="Password"
      inputCheckerType="password"
      inputClassName="Password-input Default-input"
      togglePasswordVisibility
      toggleIconClassName="Password-toggle-icon"
    />
  ));


storiesOf('Dropdown', module)
  .add('Test', () => (
    <Dropdown
      dropdownContainerClass="Dropdown-container-test"
      dropdownButtonClass="Dropdown-button-test"
      optionsButtonClass="Dropdown-options-button-test"
      dropdownLabeled
      dropdownOptions={['50km', '100km', '200km', '300km', '150km', '1010km', '2100km', '2323km']}
      placeholderText="Radius"
      dropdownOptionsContainerClass="Dropdown-options-container-test"
      dropdownArrowIconClass="Dropdown-arrow-icon-test"
      dropdownArrowVisible
      dropdownType="standalone-dropdown"
    />
  ));
storiesOf('Loader', module)
  .add('Loader', () => (
    <Loader />
  ));

storiesOf('BagContainer', module)
  .add('BagContainer', () => (
    <Bag bagItemsInfo={BagData} />
  ));

storiesOf('BillSummary', module)
  .add('BillSummary', () => (
    <BillSummary bagItemsInfo={BagData} />
  ));
