import { call, put, takeLatest } from 'redux-saga/effects';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import request from 'utils/request';
import { SIGNUP_ACTION } from './constants';
// import { makeSelectSignUp } from './selectors';

// function responseAction(response) {
//   const code = response.code;

//   if (code === 419) {
//     //419: When the session has expired
//     // return sessionExpired();
//   }
//   return dataLoaded(reponse.data);
// }
export function* signup(signData) {
  // Select username from store
  // const data = yield select(makeSelectSignUp());
  // const data = new FormData(event.target);
  // console.log(signData);
  // console.log(signData.data);
  // console.log(signData.data.get('username'));
  const requestURL = 'http://127.0.0.1:8080/user/signUp';

  try {
    // Call our request helper (see 'utils/request')

    // const options = {
    //   body: JSON.stringify({ login, password }),
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' }
    // };

    // private String email;
    // private String username;
    // private String password;
    // private String passwordRepeat;

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: signData.data.get('email'),
        username: signData.data.get('username'),
        password: signData.data.get('password'),
        passwordRepeat: signData.data.get('passwordRepeat'),
      }),
    };

    // const req = request(request, requestURL, options);
    const repos = yield call(request, requestURL, options);
    // console.log(repos);
    yield put(reposLoaded(repos, repos));

    // const { response, error } = yield call(fetchProductsApi);
    // if (response) yield put({ type: 'PRODUCTS_RECEIVED', products: response });
    // else yield put({ type: 'PRODUCTS_REQUEST_FAILED', error });
  } catch (err) {
    // console.log(err);
    // console.log(err.response);
    // console.log(err.response.body.code);
    yield put(repoLoadingError(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGNUP_ACTION, signup);
}
