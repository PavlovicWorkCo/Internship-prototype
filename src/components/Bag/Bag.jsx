import React from 'react';
import PropTypes from 'prop-types';
import BagItem from '../BagItem/BagItem';
import BagLabelsContainer from '../BagLabelsContainer/BagLabelsContainer';
import './Bag.css';
import Button from '../Button/Button';

const Bag = (props) => {
  const { bagItemsInfo, deleteBagItem, setItemQuantity } = props;
  const bagItems = bagItemsInfo.map((bagItem, index) => (
    <BagItem
      key={bagItem.id}
      itemName={bagItem.name}
      selectedSize={bagItem.size}
      selectedColor={bagItem.selected_color}
      availableColors={bagItem.available_colors}
      itemPicture={bagItem.picture}
      itemQuantity={bagItem.quantity}
      itemPrice={bagItem.cost}
      availableSizes={bagItem.available_sizes}
      deleteBagItem={() => deleteBagItem(index)}
      smallVersion={bagItemsInfo.length > 2}
      setItemQuantity={quantity => setItemQuantity(quantity, index)}
    />
  ));

  return (
    <React.Fragment>
      <div className="Bag-navi-container">
        <div className="Log-in-buttons-container">
          <Button
            className="Transparent-button Log-in-button"
            buttonText="Log in"
            buttonTextClassName="Log-in-button-text"
          />
          <Button
            className="Transparent-button Register-button"
            buttonText="Register"
            buttonTextClassName="Register-button-text"
          />
        </div>
      </div>
      <BagLabelsContainer numberOfItems={bagItemsInfo.length} />
      <div className="Bag-items-container">
        {bagItems}
      </div>
    </React.Fragment>
  );
};

Bag.defaultProps = {
  bagItemsInfo: null,
  deleteBagItem: null,
  setItemQuantity: null,
};

Bag.propTypes = {
  bagItemsInfo: PropTypes.arrayOf(PropTypes.object),
  deleteBagItem: PropTypes.func,
  setItemQuantity: PropTypes.func,
};


export default Bag;
