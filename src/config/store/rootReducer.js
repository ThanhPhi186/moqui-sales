import {AuthenOverallRedux, CartRedux, StoreRedux} from '../../redux';

const reducerMap = {
  AuthenOverallReducer: AuthenOverallRedux.Reducer,
  CartReducer: CartRedux.Reducer,
  StoreReducer: StoreRedux.Reducer,
};

export default reducerMap;
