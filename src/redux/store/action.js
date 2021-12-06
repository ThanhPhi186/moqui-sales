import {createAction} from '@reduxjs/toolkit';
import {reduxHelper} from '../../helpers';

export const GET_LIST_STORE = 'GET_LIST_STORE';
export const CHANGE_STORE = 'CHANGE_STORE';

export const changeStore = createAction(CHANGE_STORE);
export const getListStore = reduxHelper.generateActions(GET_LIST_STORE);
