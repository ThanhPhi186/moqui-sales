import {put, call, takeEvery, select} from 'redux-saga/effects';
import {ServiceHandle} from '../../services';
import {Const} from '../../utils';
import {logout} from './action';

function* logoutAsync(action) {
  try {
    const response = yield call(ServiceHandle.post, Const.API.Logout);
    console.log('response', response);
    if (response.ok) {
      yield put(logout.success(response.data));
    } else {
      yield put(logout.failed(response.error));
    }
  } catch (error) {
    yield put(logout.failed(error));
  }
}

export function* AuthenOverallWatcher() {
  [yield takeEvery(logout.requestName, logoutAsync)];
}
