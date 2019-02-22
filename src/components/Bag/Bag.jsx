import React from 'react';
import PropTypes from 'prop-types';
import BagItem from '../BagItem/BagItem';

const Bag = (props) => {
  const { bagItemsInfo, deleteBagItem } = props;
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
    />
  ));

  return (
    <div>{bagItems}</div>
  );
};

Bag.defaultProps = {
  bagItemsInfo: null,
  deleteBagItem: null,
};

Bag.propTypes = {
  bagItemsInfo: PropTypes.arrayOf(PropTypes.object),
  deleteBagItem: PropTypes.func,
};


export default Bag;
