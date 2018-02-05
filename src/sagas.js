import { call, put, takeLatest } from 'redux-saga/effects';

import {
  action,

  INITIALIZE,
  SET_CHANNELS,
  CREATE_CHANNEL,
  GET_CHANNELS_SUCCEEDED,
  GET_CHANNELS_FAILED
} from './actions';

import { getChannels } from './api';

function* initialize() {
  try {
    const channels = yield call(getChannels);
    yield put(action(GET_CHANNELS_SUCCEEDED));
    yield put(action(SET_CHANNELS, {channels}));
  } catch (e) {
    yield put(action(GET_CHANNELS_FAILED));
  }
}

export default function* rootSaga() {
  yield takeLatest(INITIALIZE, initialize);
}
