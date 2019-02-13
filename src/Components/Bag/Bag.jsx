import React from 'react';

const Bag = (props) => {
  const bagItems = props.bagItems.map(bagItem => (
    <div key={bagItem.id}>
      <p>{bagItem.name}</p>
      <p>{bagItem.size}</p>
      <p>{bagItem.color_name}</p>
    </div>
  ));
  return (bagItems);
};

export default Bag;
