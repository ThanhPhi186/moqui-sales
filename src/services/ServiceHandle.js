import {Const, trans} from '../utils';
import {create} from 'apisauce';
// import qs from 'querystring';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux, StoreRedux} from '../redux';
import configureStore from '../config/store/configureStore';

const api = create({
  timeout: 20000,
  baseURL: configureStore().store.getState().AuthenOverallReducer.domain,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

console.log(
  'service handle',
  configureStore().store.getState().AuthenOverallReducer.domain,
);

const logout = () => {
  // console.log('aaaa');
  // setHeader('');
  // configureStore().store.dispatch(AuthenOverallRedux.Actions.logout.request());
  configureStore().store.dispatch(StoreRedux.Actions.changeStore(''));
};

// api.addMonitor(res => {
//   console.log('addMonitor', res);
//   if (res.data._USER_HAS_LOGOUT === 'Y') {
//     setTimeout(() => {
//       SimpleToast.show(trans('expiredToken'), SimpleToast.SHORT);
//     }, 700);
//   }
// });

// api.axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage?.getItem('token')) || {};
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   },
// );

const returnData = response => {
  console.log('response =====>', response);

  if (response.status) {
    if (response.status === 200) {
      return {
        data: response.data,
        headers: response.headers,
        ok: true,
      };
    } else if (response.status === 401) {
      console.log('401401401');
      // configureStore().store.dispatch(
      //   AuthenOverallRedux.Actions.logout.request(),
      // ),
      logout();

      return {
        ok: false,
        error: trans('expiredToken'),
      };
    } else {
      return {
        ok: false,
        error: response.data.errors,
      };
    }
  } else {
    return {
      ok: false,
      error: trans('networkError'),
    };
  }
};

const setHeader = apiKey => {
  api.setHeader('api_key', apiKey);
};

const setBaseUrl = url => {
  api.setBaseURL(url);
};

const get = async (url, params) => {
  const response = await api.get(url, params);
  return returnData(response);
};
const post = async (url, payload) => {
  const response = await api.post(url, payload);
  return returnData(response);
};
const put = async (url, payload) => {
  const response = await api.put(url, payload);
  return returnData(response);
};
const deleteApi = async (url, payload) => {
  const response = await api.delete(url, payload);
  return returnData(response);
};

export {setHeader, setBaseUrl, get, post, put, deleteApi};
