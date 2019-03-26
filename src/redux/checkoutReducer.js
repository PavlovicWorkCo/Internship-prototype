import {
  SUBMIT_EMAIL,
  LOG_WITH_ACCOUNT,
  SUBMIT_SHIPPING_FORM,
  SUBMIT_PAYMENT_METHOD,
} from './actions';

const checkoutReducer = (
  state = {
    loggedInMail: null,
    shippingFormSubmitted: null,
    paymentMethodSubmitted: null,
  }, action,
) => {
  switch (action.type) {
    case SUBMIT_EMAIL:
      return Object.assign({}, state, { loggedInMail: action.email });
    case LOG_WITH_ACCOUNT:
      return Object.assign({}, state, { loggedIn: true });
    case SUBMIT_SHIPPING_FORM:
      return Object.assign({}, state, { shippingFormSubmitted: action.submittedFormValues });
    case SUBMIT_PAYMENT_METHOD:
      return Object.assign({}, state, { paymentMethodSubmitted: action.submittedFormValues });
    default:
      return state;
  }
};

export default checkoutReducer;
