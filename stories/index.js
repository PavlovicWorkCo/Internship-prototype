/* eslint-disable*/
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/Components/Button/Button';
import paypalIcon from '../public/Icons/image.svg';
import '../src/index.css';

storiesOf('Button', module)
  .add('Disabled', () => (
    <Button buttonText="Estimate" buttonTextClassName="Checkout-button-text" className="Checkout-button Disabled-button Test-button-size"/>
  ))
  .add('Light', () => (
    <Button buttonText="Update Bag" className="Light-button Test-button-size"/>
  ))
  .add('Transparent', () => (
    <Button buttonText="Log in" buttonTextClassName="Transparent-button-text" className="Transparent-button Test-button-size"/>
  ))
  .add('Payment', () => (
    <Button buttonIconURL={paypalIcon} iconClassName="Icon-paypal" className="Payment-button Test-button-size"/>
  ))
  .add('Checkout', () => (
    <Button buttonText="Checkout now" buttonTextClassName="Checkout-button-text" className="Checkout-button Test-button-size"/>
  ));
