import React from 'react';
import Input from '../Components/Input/Input';

/* eslint-disable */
class Page1 extends React.PureComponent {
  render() {
    return (
      <div>
        <Input
          inputType="password"
          placeholderText="Password"
          inputCheckerType="password"
          inputClassName="Password-input Default-input"
          togglePasswordVisibility
          toggleIconClassName="Password-toggle-icon"
        />
      </div>
    );
  }
}

export default Page1;
