import ActionTypes from './actionTypes';

export const UserAction = (userinfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USER_INFO,
      payload: userinfo,
    });
  };
};

export const setCrntPdt = (paintingInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PRODUCT,
      payload: paintingInfo,
    });
  };
};

export const setFavAction = (favItem) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_FAVOURITE,
      payload: favItem,
    });
  };
};

export const removeFavAction = (itemId) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_FAVOURITE,
      payload: itemId,
    });
  };
};

export const addCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.ADD_ITEM_CART,
      payload: item,
    });
  };
};

export const removeCartAction = (item) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.REMOVE_ITEM_CART,
      payload: item,
    });
  };
};

export const resetCart = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_CART,
    });
  };
};
