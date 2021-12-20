import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  domain: '',
  userAuthen: {},
  location: null,
  errorMessage: '',
  loading: false,
  accountUser: {
    username: '',
    password: '',
  },
  cookies: '',
};

const overallReducer = createReducer(initialState, {
  //setDomain
  [Actions.setDomain]: (state, action) => {
    state.domain = action.payload;
  },

  //login
  [Actions.loginSuccess]: (state, action) => {
    state.loading = false;
    state.userAuthen = action.payload;
  },

  [Actions.getProfile.success]: (state, action) => {
    state.errorMessage = '';
    state.userAuthen = action.payload;
  },

  [Actions.setCookies]: (state, action) => {
    state.loading = false;
    state.cookies = action.payload;
  },

  //logout
  [Actions.logout.success]: (state, action) => {
    state.userAuthen = {};
    state.cookies = '';
  },

  // set account

  [Actions.setAccount]: (state, action) => {
    console.log('aaaa');
    state.accountUser = action.payload;
  },

  // reset Company
  [Actions.resetCompany]: (state, action) => {
    state.domain = '';
  },

  //handleLogout
  [Actions.handleLogout]: (state, action) => {
    state.userAuthen = {};
  },

  //get Location

  [Actions.getLocation]: (state, action) => {
    state.location = action.payload;
  },
});

export default overallReducer;
