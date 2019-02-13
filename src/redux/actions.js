export const BAG_REQUEST = 'BAG_REQUEST';
export const BAG_SUCCESS = 'BAG_SUCCESS';
export const BAG_ERROR = 'BAG_ERROR';

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
