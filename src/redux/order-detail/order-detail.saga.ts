import { put, takeLatest, call, select, all } from "redux-saga/effects";
import axios from "axios";
import {
  orderDetailRequestSuccess,
  orderDetailRequestFailure,
} from "./actions";
import { OrderDetailActionTypes } from "./action.types";
import { RootState } from "../rootReducer";
import { IOrderDetailRequestStart } from "./types";

function* orderDetailStart() {
  yield takeLatest(
    OrderDetailActionTypes.ORDER_DETAIL_REQUEST_START,
    orderDetailStartAsync
  );
}

function* orderDetailStartAsync(action: IOrderDetailRequestStart) {
  try {
    const getUser = (state: RootState) => state.user;
    let { userInfo } = yield select(getUser);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.get(
      `${process.env.DJANGO_API_URL!}/api/orders/${action.payload}/`,
      config
    );
    yield put(orderDetailRequestSuccess(data));
  } catch (e: any) {
    yield put(orderDetailRequestFailure(e.message));
  }
}

export function* orderDetailRequestSaga() {
  yield all([call(orderDetailStart)]);
}
