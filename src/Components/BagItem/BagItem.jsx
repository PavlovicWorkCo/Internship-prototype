import React from 'react';
import PropTypes from 'prop-types';
import './BagItem.css';
import Dropdown from '../Dropdown/Dropdown';
import deleteItemIcon from '../../assets/icons/x-delete.svg';
import Button from '../Button/Button';
import StringCaseChanger from '../../helper/StringCaseChanger';

class BagItem extends React.PureComponent {
  render() {
    const {
      key, itemName, selectedSize, selectedColor, itemPicture, itemQuantity,
      itemPrice, availableColors, availableSizes, deleteBagItem, smallVersion,
    } = this.props;

    const quantityOptions = [];
    for (let i = 1; i <= 10; i += 1) {
      quantityOptions.push(i.toString());
    }

    let sizeVersion = 'Few-items-version';
    if (smallVersion) {
      sizeVersion = 'Many-items-version';
    }

    const capitalizedAvailableColors = availableColors.map(color => (
      {
        ...color,
        color_name: StringCaseChanger.capitalizeFirstLetter(color.color_name),
      }
    ));
    return (
      <div key={key} className="Bag-item-outer-container">
        <div className={`Bag-item-inner-container ${sizeVersion}`}>
          <div className={`Bag-item-picture-container ${sizeVersion}`}>
            <img alt="" className="Bag-item-picture" src={itemPicture} />
          </div>
          <p className={`Bag-item-name ${sizeVersion}`}>{itemName}</p>
          <Dropdown
            dropdownContainerClass="Bag-item-dropdown-container Color-dropdown-container"
            dropdownButtonClass="Bag-item-color-container"
            optionsButtonClass="Bag-item-color-options"
            dropdownOptions={capitalizedAvailableColors}
            defaultSelected={{
              ...selectedColor,
              color_name: StringCaseChanger.capitalizeFirstLetter(selectedColor.color_name),
            }}
            dropdownOptionsContainerClass="Bag-item-color-options-container"
            dropdownArrowIconClass="Dropdown-arrow-bag-item"
            dropdownArrowVisible
            dropdownWithColor
          />
          <Dropdown
            dropdownContainerClass="Bag-item-dropdown-container Size-dropdown-container"
            dropdownButtonClass="Bag-item-size-container"
            optionsButtonClass="Bag-item-size-options"
            dropdownOptions={availableSizes}
            defaultSelected={selectedSize}
            dropdownOptionsContainerClass="Bag-item-size-options-container"
            dropdownArrowIconClass="Dropdown-arrow-bag-item"
            dropdownArrowVisible
            noOptionsClass="No-border"
          />
          <Dropdown
            dropdownContainerClass="Bag-item-dropdown-container Quantity-dropdown-container"
            dropdownButtonClass="Bag-item-quantity-container"
            optionsButtonClass="Bag-item-quantity-options"
            dropdownOptions={quantityOptions}
            defaultSelected={itemQuantity}
            dropdownOptionsContainerClass="Bag-item-quantity-options-container"
            dropdownArrowIconClass="Dropdown-arrow-bag-item"
            dropdownArrowVisible
          />
          <p className="Bag-item-price">{itemPrice}</p>

        </div>
        <Button
          className="Bag-item-delete-button"
          buttonIcon={deleteItemIcon}
          iconClassName="Bag-item-delete-icon"
          onClick={deleteBagItem}
        />
      </div>
    );
  }
}


BagItem.defaultProps = {
  key: null,
  itemName: null,
  selectedSize: null,
  selectedColor: null,
  itemPicture: null,
  itemQuantity: null,
  itemPrice: null,
  availableColors: null,
  availableSizes: null,
  deleteBagItem: null,
  smallVersion: null,
};

BagItem.propTypes = {
  key: PropTypes.string,
  itemName: PropTypes.string,
  selectedSize: PropTypes.string,
  selectedColor: PropTypes.object,
  itemPicture: PropTypes.string,
  itemQuantity: PropTypes.string,
  itemPrice: PropTypes.string,
  availableColors: PropTypes.arrayOf(PropTypes.object),
  availableSizes: PropTypes.string,
  deleteBagItem: PropTypes.func,
  smallVersion: PropTypes.bool,
};

export default BagItem;
