import { RootState } from "@/redux/rootReducer";
import { call, takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";
import { UserDetailTypes } from "./actiontypes";
import { userDetailRequestSuccess, userDetailRequestFailure } from "./actions";

interface UserDetalRequestAction {
  type: UserDetailTypes.USER_DETAILS_START;
  payload: string;
}

export function* userDetailRequestStart() {
  yield takeLatest(
    UserDetailTypes.USER_DETAILS_START,
    onStartUserDetailRequest
  );
}

export function* onStartUserDetailRequest(action) {
  const getUser = (state: RootState) => state.user;
  let { userInfo } = yield select(getUser);
  console.log("userinfotoken", userInfo.token);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.get(
      `${process.env.DJANGO_API_URL!}/api/users/${action.payload}/`,
      config
    );
    console.log("data in saga", data);
    yield put(userDetailRequestSuccess(data));
  } catch (e) {
    yield put(userDetailRequestFailure(e.message));
  }
}

export function* userDetailRequestSagas() {
  yield all([call(userDetailRequestStart)]);
}
