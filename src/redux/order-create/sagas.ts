import { call, put, takeLatest, all, select } from "redux-saga/effects";
import axios from "axios";
import { OrderCreateActionTypes } from "./action.types";
import { orderCreateSuccess, orderCreateFailure, orderReset } from "./actions";
import { clearCartItems } from "../cart/cart.actions";
import { RootState } from "../rootReducer";

function* orderCreateStart() {
  yield takeLatest(OrderCreateActionTypes.ORDER_CREATE_START, orderCreateAsync);
}

function* orderCreateAsync(action) {
  try {
    const getUser = (state: RootState) => state.user;
    let { userInfo } = yield select(getUser);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.post(
      `${process.env.DJANGO_API_URL!}/api/orders/add/`,
      action.payload,
      config
    );

    yield put(orderCreateSuccess(data));
    yield put(orderReset());
    yield put(clearCartItems());
  } catch (e) {
    yield put(orderCreateFailure(e.message));
  }
}

export function* orderCreateSagas() {
  yield all([call(orderCreateStart)]);
}
