import { combineReducers } from 'redux';
import {
  getBagItemsCost, getTotalCost, checkShipToAddressFree, estimateTax,
} from '../helper/calculateCost';
import { defaultGSTRate, defaultPSTRate, defaultPromoDiscount } from '../helper/costChangers';
import checkoutReducer from './checkoutReducer';

import {
  BAG_REQUEST,
  BAG_ERROR,
  BAG_SUCCESS,
  BAG_DELETE_ITEM,
  ACTIVATE_CHECKOUT_VIEW,
  SUBMIT_PROMO_CODE,
  SUBMIT_POSTAL_CODE,
  SET_PICKUP_IN_STORE,
  SET_ITEM_QUANTITY,
} from './actions';

const bagItems = (
  state = {
    isFetching: null,
    items: [],
    errorMessage: null,
    promoCodeSubmitted: null,
    promoDiscount: 0,
    postalCodeSubmitted: null,
    taxGSTRate: 0,
    taxPSTRate: 0,
    gstTax: 0,
    pstTax: 0,
    pickupInStore: false,
    isShippingToAddressFree: false,
    bagItemsCost: null,
    totalCost: null,
  }, action,
) => {
  switch (action.type) {
    case BAG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: null,
      });
    case BAG_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        bagItemsCost: getBagItemsCost(action.items),
        isShippingToAddressFree: checkShipToAddressFree(getBagItemsCost(action.items)),
        totalCost: getTotalCost(getBagItemsCost(action.items), state.taxGSTRate,
          state.taxPSTRate, state.promoDiscount, state.pickupInStore,
          checkShipToAddressFree(getBagItemsCost(action.items))),
      });
    case BAG_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: 'Something went wrong. Please try again later',
      });
    case BAG_DELETE_ITEM:
      return Object.assign({}, state, {
        items: [
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1),
        ],
        bagItemsCost: getBagItemsCost([
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1),
        ]),
        totalCost: getTotalCost(getBagItemsCost([
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1),
        ]),
        state.taxGSTRate, state.taxPSTRate, state.promoDiscount,
        state.pickupInStore, checkShipToAddressFree(getBagItemsCost(
          [
            ...state.items.slice(0, action.index),
            ...state.items.slice(action.index + 1),
          ],
        ))),
        isShippingToAddressFree: checkShipToAddressFree(getBagItemsCost(
          [
            ...state.items.slice(0, action.index),
            ...state.items.slice(action.index + 1),
          ],
        )),
        gstTax: estimateTax(getBagItemsCost([
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1),
        ]), state.taxGSTRate, state.promoDiscount),
        pstTax: estimateTax(getBagItemsCost([
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1),
        ]), state.taxPSTRate, state.promoDiscount),
      });
    case SET_ITEM_QUANTITY:
      return Object.assign({}, state, {
        items: [
          ...state.items.slice(0, action.itemIndex),
          Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
          ...state.items.slice(action.itemIndex + 1),
        ],
        bagItemsCost: getBagItemsCost([
          ...state.items.slice(0, action.itemIndex),
          Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
          ...state.items.slice(action.itemIndex + 1),
        ]),
        totalCost: getTotalCost(getBagItemsCost([
          ...state.items.slice(0, action.itemIndex),
          Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
          ...state.items.slice(action.itemIndex + 1),
        ]),
        state.taxGSTRate, state.taxPSTRate, state.promoDiscount,
        state.pickupInStore, checkShipToAddressFree(getBagItemsCost(
          [
            ...state.items.slice(0, action.itemIndex),
            Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
            ...state.items.slice(action.itemIndex + 1),
          ],
        ))),
        isShippingToAddressFree: checkShipToAddressFree(getBagItemsCost(
          [
            ...state.items.slice(0, action.itemIndex),
            Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
            ...state.items.slice(action.itemIndex + 1),
          ],
        )),
        gstTax: estimateTax(getBagItemsCost([
          ...state.items.slice(0, action.itemIndex),
          Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
          ...state.items.slice(action.itemIndex + 1),
        ]), state.taxGSTRate, state.promoDiscount),
        pstTax: estimateTax(getBagItemsCost([
          ...state.items.slice(0, action.itemIndex),
          Object.assign({}, state.items[action.itemIndex], { quantity: action.itemQuantity }),
          ...state.items.slice(action.itemIndex + 1),
        ]), state.taxPSTRate, state.promoDiscount),
      });
    case SET_PICKUP_IN_STORE:
      return Object.assign({}, state, {
        pickupInStore: action.boolValue,
        totalCost: getTotalCost(state.bagItemsCost, state.taxGSTRate,
          state.taxPSTRate, state.promoDiscount, action.boolValue,
          state.isShippingToAddressFree),
      });
    case SUBMIT_PROMO_CODE:
    { const promoDiscount = action.value ? defaultPromoDiscount : 0;
      return Object.assign({}, state, {
        promoCodeSubmitted: action.value,
        promoDiscount,
        totalCost: getTotalCost(state.bagItemsCost, state.taxGSTRate,
          state.taxPSTRate, promoDiscount, state.pickupInStore,
          state.isShippingToAddressFree),
        gstTax: estimateTax(state.bagItemsCost, state.taxGSTRate, promoDiscount),
        pstTax: estimateTax(state.bagItemsCost, state.taxPSTRate, promoDiscount),
      });
    }
    case SUBMIT_POSTAL_CODE:
      return Object.assign({}, state, {
        postalCodeSubmitted: action.value,
        taxGSTRate: defaultGSTRate,
        taxPSTRate: defaultPSTRate,
        totalCost: getTotalCost(state.bagItemsCost, defaultGSTRate,
          defaultPSTRate, state.promoDiscount, state.pickupInStore,
          state.isShippingToAddressFree),
        gstTax: estimateTax(state.bagItemsCost, defaultGSTRate, state.promoDiscount),
        pstTax: estimateTax(state.bagItemsCost, defaultPSTRate, state.promoDiscount),
      });
    default:
      return state;
  }
};

const checkoutView = (
  state = false, action,
) => {
  switch (action.type) {
    case ACTIVATE_CHECKOUT_VIEW:
      return action.value;
    default:
      return state;
  }
};


const reducers = combineReducers({ bagItems, checkoutView, checkoutReducer });
export default reducers;
