import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  numberProductCart: 0,
  listProductCart: [],
};

const cartReducer = createReducer(initialState, {
  [Actions.addToCart]: (state, action) => {
    if (
      state.listProductCart
        .map(elm => elm.productId + elm.uomId)
        .includes(action.payload.productId + action.payload.uomId)
    ) {
      state.listProductCart = [...state.listProductCart].map(elm => {
        if (
          elm.productId === action.payload.productId &&
          elm.uomId === action.payload.uomId
        ) {
          elm.amount += action.payload.amount;
        }
        return elm;
      });
    } else {
      state.listProductCart.push(action.payload);
    }
    state.numberProductCart = state.listProductCart.length;
  },

  [Actions.removeToCart]: (state, action) => {
    state.listProductCart = [
      ...state.listProductCart.filter(
        elm =>
          elm.productId + elm.uomId !==
          action.payload.productId + action.payload.uomId,
      ),
    ];
    state.numberProductCart = state.listProductCart.length;
  },
});

export default cartReducer;
