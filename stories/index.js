/* eslint-disable*/
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/Components/Button/Button';
import paypalIcon from '../public/Icons/image.svg'

storiesOf('Button', module)
  .add('Disabled', () => (
    <Button buttonText="Estimate" className="Disabled-button Test-button-size"/>
  ))
  .add('Light', () => (
    <Button buttonText="Update Bag" className="Light-button Test-button-size"/>
  ))
  .add('Transparent', () => (
    <Button buttonText="Log in" className="Transparent-button Test-button-size"/>
  ))
  .add('Paypal', () => (
    <Button buttonIconURL={paypalIcon} iconClassName="Icon-paypal" className="Paypal-button Test-button-size"/>
  ));
