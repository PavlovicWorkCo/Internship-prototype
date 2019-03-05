export const BAG_REQUEST = 'BAG_REQUEST';
export const BAG_SUCCESS = 'BAG_SUCCESS';
export const BAG_ERROR = 'BAG_ERROR';
export const BAG_DELETE_ITEM = 'BAG_DELETE_ITEM';
export const ACTIVATE_CHECKOUT_VIEW = 'ACTIVATE_CHECKOUT_VIEW';
export const CHANGE_PROMO_CODE_DISCOUNT = 'CHANGE_PROMO_CODE';
export const CHANGE_TAX = 'CHANGE_TAX';
export const SUBMIT_PROMO_CODE = 'SUBMIT_PROMO_CODE';
export const SUBMIT_POSTAL_CODE = 'SUBMIT_POSTAL_CODE';
export const TOGGLE_PICKUP_IN_STORE = 'TOGGLE_PICKUP_IN_STORE';

function requestBag() {
  return {
    type: BAG_REQUEST,
  };
}

function receiveBag(json) {
  return {
    type: BAG_SUCCESS,
    items: json.bag,
  };
}

function requestFailed() {
  return {
    type: BAG_ERROR,
  };
}

export function fetchBag() {
  /* eslint-disable func-names, no-undef */
  return function (dispatch) {
    dispatch(requestBag());
    return fetch('https://private-05a801-internship1.apiary-mock.com/clothes')
      .then(response => response.json())
      .then(json => dispatch(receiveBag(json)))
      .catch(() => dispatch(requestFailed()));
  };
}

export function deleteBagItem(index) {
  return {
    type: BAG_DELETE_ITEM,
    index: index, //eslint-disable-line
  };
}

export function goToCheckout() {
  return {
    type: ACTIVATE_CHECKOUT_VIEW,
  };
}

export function changeTax(tax) {
  return {
    type: CHANGE_TAX,
    tax,
  };
}

export function submitPromoCode(code) {
  return {
    type: SUBMIT_PROMO_CODE,
    value: code,
  };
}

export function submitPostalCode(code) {
  return {
    type: SUBMIT_POSTAL_CODE,
    value: code,
  };
}

export function togglePickupInStore() {
  return {
    type: TOGGLE_PICKUP_IN_STORE,
  };
}
