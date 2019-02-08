import React from 'react';
import Dropdown from '../Components/Dropdown/Dropdown';

/* eslint-disable */
class Page2 extends React.PureComponent {
  render() {
    return (
      <div>
        <Dropdown
          defaultSelected="50km"
          dropdownButtonClass="Dropdown-button-test"
          optionsButtonClass="Dropdown-options-button-test"
          dropdownLabeled
          dropdownOptions={['50km', '100km', '200km', '300km', '150km', '1010km', '2100km', '2323km']}
          placeholderText="Radius"
          dropdownOptionsContainerClass="Dropdown-options-container-test"
        />
      </div>
    );
  }
}

export default Page2;
