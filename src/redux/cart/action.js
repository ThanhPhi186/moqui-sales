import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_TO_CART = 'REMOVE_TO_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const GET_CART = 'GET_CART';
// export const GET_SALES_CART = 'GET_SALES_CART';
// export const REMOVE_SALES_CART = 'REMOVE_SALES_CART';

const addToCart = createAction(ADD_TO_CART);
const removeToCart = createAction(REMOVE_TO_CART);
const emptyCart = createAction(EMPTY_CART);
const getCart = reduxHelper.generateActions(GET_CART);
// const getSalesCart = reduxHelper.generateActions(GET_SALES_CART);
// const removeSalesCart = createAction(REMOVE_SALES_CART);

export {addToCart, removeToCart, emptyCart, getCart};
