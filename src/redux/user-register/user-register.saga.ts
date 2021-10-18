import { call, takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";
import Router from "next/router";
import { UserRegisterActionTypes } from "./action.types";
import { userRegisterSuccess, userRegisterFailure } from "./action.creators";
import { IUserRegisterStartAction } from "./types";

export function* userRegisterStart() {
  yield takeLatest(
    UserRegisterActionTypes.USER_REGISTER_START,
    onRegisterStartAsync
  );
}

export function* onRegisterStartAsync(action: IUserRegisterStartAction) {
  const { name, email, password } = action.payload;
  try {
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = yield axios.post(
      `${process.env.DJANGO_API_URL!}/api/users/register/`,
      { name, email, password },
      config
    );
    console.log("data inregister", data);
    yield put(userRegisterSuccess(data));
    Router.push("/login");
  } catch (e: any) {
    console.log("error in user REgister", e);
    yield put(userRegisterFailure(e.message ? e.message : JSON.stringify(e)));
  }
}

export function* userRegisterSaga() {
  yield call(userRegisterStart);
}
