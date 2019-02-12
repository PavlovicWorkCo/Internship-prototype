import { combineReducers } from 'redux';

const bagItems = (
  state = {
    isFetching: false,
    items: [],
  }, action,
) => {
  switch (action.type) {
    case 'BAG_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'BAG_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      });
    default:
      return state;
  }
};


const reducers = combineReducers({ bagItems });
export default reducers;
