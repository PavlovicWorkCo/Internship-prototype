import { combineReducers } from 'redux';
import {
  BAG_REQUEST,
  BAG_ERROR,
  BAG_SUCCESS,
  BAG_DELETE_ITEM,
} from './actions';

const bagItems = (
  state = {
    isFetching: null,
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
    case BAG_DELETE_ITEM:
      return Object.assign({}, state, {
        items: [
          ...state.items.slice(0, action.index),
          ...state.items.slice(action.index + 1),
        ],
      });
    default:
      return state;
  }
};


const reducers = combineReducers({ bagItems });
export default reducers;
