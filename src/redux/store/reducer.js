import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  listStore: [],
  store: '',
  loading: false,
};

const storeReducer = createReducer(initialState, {
  [Actions.getListStore.request]: (state, action) => {
    state.loading = true;
  },
  [Actions.getListStore.success]: (state, action) => {
    state.listStore = action.payload.listProductStore;
    state.store = action.payload.listProductStore[0].productStoreId;
    state.loading = false;
  },
  [Actions.getListStore.failed]: (state, action) => {
    state.loading = false;
  },

  //change store
  [Actions.changeStore]: (state, action) => {
    state.store = action.payload;
  },
});

export default storeReducer;
