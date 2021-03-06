import { call, takeLatest, put, select, all } from "redux-saga/effects";
import axios from "axios";
import { OrderPayActionTypes } from "./action.types";
import { orderPaySuccess, orderPayFailure, orderPayReset } from "./actions";
import { RootState } from "../rootReducer";
import { IOrderPayStart } from "./types";

function* orderPayStart() {
  yield takeLatest(
    OrderPayActionTypes.ORDER_PAY_REQUEST_START,
    orderPayStartAsync
  );
}

function* orderPayStartAsync(action: IOrderPayStart) {
  try {
    const getUser = (state: RootState) => state.user;
    let { userInfo } = yield select(getUser);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.put(
      `${process.env.DJANGO_API_URL!}/api/orders/${action.payload.id}/pay/`,
      action.payload.paymentResult,
      config
    );
    yield put(orderPaySuccess(data));
    yield put(orderPayReset());
  } catch (e: any) {
    yield put(orderPayFailure(e.message));
  }
}

export function* orderPaySagas() {
  yield all([call(orderPayStart)]);
}
