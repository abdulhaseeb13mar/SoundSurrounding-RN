import ActionTypes from './actionTypes';
import {combineReducers} from 'redux';
import actionTypes from './actionTypes';

const userState = {};
let crntPrdtState = {};
let FavItems = [];
let cart = {
  items: {},
  totalItems: 0,
  totalAmount: 0,
};

const cartReducer = (st = cart, action) => {
  let prev_items = {...st.items};
  switch (action.type) {
    case ActionTypes.ADD_ITEM_CART:
      let ITEM_ID = `${action.payload.id}_${action.payload.color}`;
      if (!prev_items[ITEM_ID]) {
        prev_items[ITEM_ID] = {...action.payload};
      }
      let added1 = prev_items[ITEM_ID].added + 1;
      prev_items[ITEM_ID].added = added1;
      let tot_items = st.totalItems + 1;
      let tot_amount = (
        parseFloat(st.totalAmount) + parseFloat(action.payload.price)
      ).toFixed(2);
      st = Object.assign({}, st, {
        items: prev_items,
        totalItems: tot_items,
        totalAmount: tot_amount,
      });
      return st;

    case ActionTypes.REMOVE_ITEM_CART:
      ITEM_ID = `${action.payload.id}_${action.payload.color}`;
      const itemAdded = prev_items[ITEM_ID].added;
      if (itemAdded === 1) {
        delete prev_items[ITEM_ID];
      } else {
        prev_items[ITEM_ID].added = itemAdded - 1;
      }
      tot_items = st.totalItems - 1;
      tot_amount = (
        parseFloat(st.totalAmount) - parseFloat(action.payload.price)
      ).toFixed(2);
      st = Object.assign({}, st, {
        items: prev_items,
        totalItems: tot_items,
        totalAmount: tot_amount,
      });
      return st;

    case actionTypes.RESET_CART:
      let resetCart = {
        items: {},
        totalItems: 0,
        totalAmount: 0,
      };
      return resetCart;

    default:
      break;
  }
  return st;
};

const userReducer = (st = userState, action) => {
  switch (action.type) {
    case ActionTypes.USER_INFO:
      st = Object.assign({}, st, {...action.payload});
      return st;

    default:
      break;
  }
  return st;
};
const crntPrdt = (state = crntPrdtState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PRODUCT:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const toggleFav = (state = FavItems, action) => {
  switch (action.type) {
    case ActionTypes.SET_FAVOURITE:
      let isUnique = true;
      let arr = [...state];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          isUnique = false;
          break;
        }
      }
      isUnique && arr.push({...action.payload});
      return arr;

    case ActionTypes.REMOVE_FAVOURITE:
      arr = state.filter((item) => item.id !== action.payload);
      return arr;

    default:
      break;
  }
  return state;
};

export default combineReducers({userReducer, crntPrdt, toggleFav, cartReducer});
