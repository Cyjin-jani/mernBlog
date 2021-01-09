import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './authSaga';
import dotenv from 'dotenv';
import postSaga from './postSaga';
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;


//여러 값을 반환할 수 있게 되어있는 function*
export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
    ]);
}
