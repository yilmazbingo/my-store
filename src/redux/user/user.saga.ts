import { call, takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";
import Router from "next/router";
import { UserActionTypes } from "./user.types";
import {
  userLoginSuccess,
  userLoginFailure,
  userLogoutSuccess,
  userLogoutFailure,
  userProfileUpdateSuccess,
  userProfileUpdateFailure,
} from "./user.actions";
import { IUserProfileUpdateStart, LoginCredentials } from "./types";
import { myOrderListReset } from "../my-orders-list/actions";
import { userListReset } from "../user-list/actions";
import { IUser } from "@/types/interfaces";
import { RootState } from "@/redux/rootReducer";

interface StartSignInAction {
  type: UserActionTypes.USER_LOGIN_START;
  payload: LoginCredentials;
}

// the action that we are catching from here will be passed on startSign
export function* userLoginStart() {
  yield takeLatest(UserActionTypes.USER_LOGIN_START, onStartSignin);
}

export function* userLogoutStart() {
  yield takeLatest(UserActionTypes.USER_LOGOUT_START, onStartLogout);
}

export function* userUpdateStart() {
  yield takeLatest(
    UserActionTypes.USER_UPDATE_REQUEST_START,
    onProfileUpdateStart
  );
}

//   if I did not pass entire action, I would get 'TakeableChannel<unknown>'
export function* onStartSignin(action: StartSignInAction) {
  const { email, password } = action.payload;
  try {
    const config = { headers: { "Content-type": "application/json" } };
    const { data }: { data: IUser } = yield axios.post(
      `${process.env.DJANGO_API_URL!}/api/users/login/`,
      {
        //   django expects username as email
        username: email,
        password,
      },
      config
    );
    yield put(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    console.log("error in loging", e);
    yield put(userLoginFailure(e));
  }
}

export function* onStartLogout() {
  try {
    if (typeof window !== undefined) {
      localStorage.removeItem("userInfo");
      yield put(userLogoutSuccess());
      yield put(myOrderListReset());
      yield put(userListReset());
      Router.push("/");
    }
  } catch (e: any) {
    yield put(userLogoutFailure(e.message));
  }
}

export function* onProfileUpdateStart(action: IUserProfileUpdateStart) {
  const getUser = (state: RootState) => state.user;
  let { userInfo } = yield select(getUser);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = yield axios.put(
      `${process.env.DJANGO_API_URL!}/api/users/profile/update/`,
      action.payload,
      config
    );
    yield put(userProfileUpdateSuccess(data));
    yield put(userLoginSuccess(data));
    if (typeof window !== undefined) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (e: any) {
    yield put(userProfileUpdateFailure(e.message));
  }
}

export function* userSagas() {
  yield all([
    call(userLoginStart),
    call(userLogoutStart),
    call(userUpdateStart),
  ]);
}
