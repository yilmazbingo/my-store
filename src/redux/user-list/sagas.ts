import { takeLatest, put, call, select, all } from "redux-saga/effects";
import { UserListTypes } from "./action.types";
import { UserListRequestAction, UserDeleteStart } from "./types";
import {
  userListSuccess,
  userListFailure,
  userDeleteSuccess,
  userDeleteFailure,
} from "./actions";
import { RootState } from "../rootReducer";
import axios from "axios";

function* userListRequestStart() {
  yield takeLatest(UserListTypes.USER_LIST_REQUEST_START, userListStartAsync);
}
function* userDeleteRequestStart() {
  yield takeLatest(
    UserListTypes.USER_DELETE_REQUEST_START,
    userDeleteStartAsync
  );
}

function* userListStartAsync() {
  try {
    const getUser = (state: RootState) => state.user;
    const { userInfo } = yield select(getUser);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.get(
      `${process.env.DJANGO_API_URL!}/api/users/`,
      config
    );

    yield put(userListSuccess(data));
  } catch (e: any) {
    yield put(userListFailure(e.message));
  }
}

function* userDeleteStartAsync(action: UserDeleteStart) {
  try {
    const getUser = (state: RootState) => state.user;
    const { userInfo } = yield select(getUser);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.delete(
      `${process.env.DJANGO_API_URL!}/api/users/delete/${action.payload}/`,
      config
    );
    yield put(userDeleteSuccess(action.payload));
  } catch (e: any) {
    yield put(userDeleteFailure(e.message));
  }
}

export function* userListSaga() {
  yield all([call(userListRequestStart), call(userDeleteRequestStart)]);
}
