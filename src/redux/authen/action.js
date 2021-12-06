import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

const PREFIX = 'AUTHEN/OVERALL';
export const LOGIN = PREFIX + '/LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_DOMAIN = 'GET_DOMAIN';
export const GET_LOCATION = 'GET_LOCATION';
export const GET_ACCOUNT = 'GET_ACCOUNT';
export const RESET_COMPANY = 'RESET_COMPANY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_COOKIES = 'SET_COOKIES';
export const GET_PROFILE = 'GET_PROFILE';
export const SET_DOMAIN = 'SET_DOMAIN';
export const HANDLE_LOGOUT = 'HANDLE_LOGOUT';

const login = reduxHelper.generateActions(LOGIN);
const logout = reduxHelper.generateActions(LOGOUT);

const getProfile = reduxHelper.generateActions(GET_PROFILE);
const getLocation = createAction(GET_LOCATION);
const getAccount = createAction(GET_ACCOUNT);
const resetCompany = createAction(RESET_COMPANY);
const loginSuccess = createAction(LOGIN_SUCCESS);
const setCookies = createAction(SET_COOKIES);
const setDomain = createAction(SET_DOMAIN);
const handleLogout = createAction(HANDLE_LOGOUT);

export {
  login,
  logout,
  getLocation,
  getAccount,
  resetCompany,
  loginSuccess,
  setCookies,
  getProfile,
  setDomain,
  handleLogout,
};
