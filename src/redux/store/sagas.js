import {put, call, takeEvery, select} from 'redux-saga/effects';
import {post} from '../../services/ServiceHandle';
import {Const} from '../../utils';

import {getListStore} from './action';

const getBaseUrl = state => state.AuthenOverallReducer.domain;

function* getListStoreAsync(action) {
  try {
    const baseURL = yield select(getBaseUrl);
    const url = baseURL + Const.API.GetProductStoreCustomer;

    const response = yield call(post, url, action.payload);
    if (response.ok) {
      yield put(getListStore.success(response.data));
    } else {
      yield put(getListStore.failed(response.error));
    }
  } catch (error) {
    yield put(getListStore.failed(error));
  }
}

export function* StoreWatcher() {
  [yield takeEvery(getListStore.requestName, getListStoreAsync)];
}
