import { combineReducers } from 'redux';
import {
  BAG_REQUEST,
  BAG_ERROR,
  BAG_SUCCESS,
} from './actions';

const bagItems = (
  state = {
    isFetching: false,
    items: [],
    errorMessage: null,
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
      });
    case BAG_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: 'Something went wrong. Please try again later',
      });
    case 'BAG_ERROR':
    default:
      return state;
  }
};


const reducers = combineReducers({ bagItems });
export default reducers;
