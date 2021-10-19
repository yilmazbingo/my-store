import { takeLatest, call, put, select, all } from "redux-saga/effects";
import axios from "axios";
import { UserUpdateActionTypes } from "./action.types";
import { userUpdateSuccess, userUpdateFailure } from "./actions";
import { RootState } from "@/redux/rootReducer";
import { IUserUpdateRequestStart } from "@/redux/user-update/types";
import Router from "next/router";

function* userUpdateStart() {
  yield takeLatest(
    UserUpdateActionTypes.USER_UPDATE_REQUEST_START,
    userUpdateStartAsync
  );
}

function* userUpdateStartAsync(action: IUserUpdateRequestStart) {
  try {
    const getState = (state: RootState) => state.user;
    const { userInfo } = yield select(getState);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.put(
      `${process.env.DJANGO_API_URL!}/api/users/update/${action.payload.id}/`,
      action.payload,
      config
    );
    yield put(userUpdateSuccess(data));
    if (typeof window !== "undefined") {
      Router.push("/admin/userlist");
    }
  } catch (e: any) {
    yield put(userUpdateFailure(e.message));
  }
}

export function* userUpdateSagas() {
  yield all([call(userUpdateStart)]);
}
