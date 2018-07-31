import { call, put, takeLatest } from 'redux-saga/effects';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import request from 'utils/request';
import { POST_ACTION } from './constants';
// Individual exports for testing
export function* post(postData) {
  console.log(postData);
  console.log(postData.data);
  console.log(postData.data.get('title'));
  console.log(postData.data.get('mutifile'));
  // console.log(postData.data.entries());
  // console.log(postData.data.mutifile.entries());

  // console.log(signData.data.get('username'));
  const requestURL = `http://127.0.0.1:8080/sample`;

  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data;',
        'Access-Control-Allow-Origin': '*',
      },
      body: postData.data,
    };

    // const req = request(request, requestURL, options);
    const repos = yield call(request, requestURL, options);
    yield put(reposLoaded(repos, repos));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(POST_ACTION, post);
}