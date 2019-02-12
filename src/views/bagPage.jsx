import React from 'react';
import { connect } from 'react-redux';
/* eslint-disable */
class BagPage extends React.PureComponent {
  render() {
    const bagItems = this.props.bagItems.map(bagItem => (
      <div>
        <p>{bagItem.name}</p>
        <p>{bagItem.size}</p>
        <p>{bagItem.color_name}</p>
      </div>
    ));

    return (
      <div>
        {bagItems}
      </div>
    );
  }
}


const mapStateToProps = (state) => { // eslint-disable-line arrow-body-style
  return {
    bagItems: state.bagItems.items,
  };
};


const BagPageContainer = connect(mapStateToProps, null)(BagPage);
export default BagPageContainer;
