import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import { animateScroll as scroll } from 'react-scroll';
import FormLabel from './FormLabel';
import Button from '../Button/Button';
import { defaultShippingCost } from '../../helper/costChangers';
import './ReviewAndFinish.css';

class ReviewAndFinish extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.formRef = React.createRef();
  }

  onEditReviewClick() {
    const { setEditingFormRef } = this.props;
    setEditingFormRef(null);
  }

  scrollToBottom() {
    const { isExpanded, editingFormRef, heightAnimationTime } = this.props;
    if (!isExpanded && editingFormRef !== this.formRef.current) return;
    scroll.scrollToBottom({
      isDynamic: true,
      duration: heightAnimationTime,
      smooth: 'linear',
      containerId: 'checkout-container',
    });
  }

  renderBoughtItems() {
    const { bagItemsInfo, deleteBagItem } = this.props;
    const bagItems = bagItemsInfo.map((bagItem, index) => {
      const itemSizeString = bagItem.size !== '–' ? ` - Size ${bagItem.size}` : '';
      return (
        <div className="Bought-item-container" key={bagItem.id}>
          <div className="Bought-item-info-and-picture">
            <div className="Bag-item-picture-container Many-items-version">
              <img className="Bag-item-picture" alt="" src={bagItem.picture} />
            </div>
            <div className="Bought-item-info-container">
              <div className="Bought-item-info">
                <p className="Bought-item-info-name">{bagItem.name}</p>
                <p className="Bought-item-info-details">{`${bagItem.selected_color.color_name}${itemSizeString} - Qty ${bagItem.quantity}`}</p>
              </div>
              <div className="Edit-and-remove-buttons">
                <Button
                  buttonText="Edit"
                  className="Transparent"
                />
                <Button
                  buttonText="Remove"
                  className="Transparent"
                  onClick={() => deleteBagItem(index)}
                />
              </div>
            </div>
          </div>
          <p className="Bought-item-price">{bagItem.cost}</p>
        </div>
      );
    });
    return (
      <div className="Bought-items-container">
        {bagItems}
      </div>
    );
  }

  renderCostOverview() {
    const {
      bagItemsCost, taxGST, taxPST, isShippingToAddressFree, pickupInStore, totalCost,
    } = this.props;
    return (
      <div className="Review-and-finish-cost-overview">
        <div className="Review-and-finish-cost-summary">
          <div className="Cost-overview-row">
            <p>Your order</p>
            <p>{`$${bagItemsCost}`}</p>
          </div>
          <div className="Cost-overview-row">
            <p>GST</p>
            <p>{`$${taxGST}`}</p>
          </div>
          <div className="Cost-overview-row">
            <p>PST</p>
            <p>{`$${taxPST}`}</p>
          </div>
          <div className="Cost-overview-row">
            <p>Shipping</p>
            {(isShippingToAddressFree || pickupInStore) ? <p>Free</p> : <p>{`$${defaultShippingCost}`}</p> }
          </div>
        </div>
        <div className="Cost-overview-row">
          <p>Total cost</p>
          <p>{`$${totalCost}`}</p>
        </div>
      </div>
    );
  }

  render() {
    const {
      isExpanded, editingFormRef, heightAnimationTime, paymentMethodSubmitted,
    } = this.props;
    const height = isExpanded || (editingFormRef === this.formRef.current && editingFormRef) ? 'auto' : 0;
    const duration = isExpanded || editingFormRef === this.formRef.current
      ? 0 : heightAnimationTime;
    return (
      <div className="Checkout-review-form-container" ref={this.formRef}>
        <FormLabel formNumber="4" formLabel="Review and finish" />
        {(!isExpanded && paymentMethodSubmitted)
          && (
          <Button
            className="Transparent-button Checkout-form-edit-button"
            buttonText="Edit"
            onClick={() => this.onEditReviewClick()}
          />
          )
        }
        <div className="Checkout-payment-form-content-wrapper">
          <AnimateHeight
            duration={duration}
            height={height}
            animateOpacity
            onAnimationEnd={() => this.scrollToBottom()}
          >
            <div>
              {this.renderBoughtItems()}
              {this.renderCostOverview()}
              <Button className="Checkout-button Place-order-button" buttonText="Place order" />
            </div>
          </AnimateHeight>
        </div>
      </div>
    );
  }
}

ReviewAndFinish.defaultProps = {
  isExpanded: false,
  editingFormRef: null,
  bagItemsInfo: null,
  bagItemsCost: null,
  taxGST: null,
  taxPST: null,
  isShippingToAddressFree: null,
  pickupInStore: null,
  totalCost: null,
  deleteBagItem: null,
  heightAnimationTime: null,
  paymentMethodSubmitted: null,
  setEditingFormRef: null,
};

ReviewAndFinish.propTypes = {
  isExpanded: PropTypes.bool,
  editingFormRef: PropTypes.object,
  bagItemsInfo: PropTypes.arrayOf(PropTypes.object),
  bagItemsCost: PropTypes.number,
  taxGST: PropTypes.number,
  taxPST: PropTypes.number,
  isShippingToAddressFree: PropTypes.bool,
  pickupInStore: PropTypes.bool,
  totalCost: PropTypes.number,
  deleteBagItem: PropTypes.func,
  heightAnimationTime: PropTypes.number,
  paymentMethodSubmitted: PropTypes.object,
  setEditingFormRef: PropTypes.func,
};

export default ReviewAndFinish;
