import { takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import { AdminOrderListTypes } from "./action.types";
import {
  orderDeliveredSuccess,
  orderDeliveredFailure,
} from "./action_creators";
import { RootState } from "../rootReducer";
import { IOrderDeliveredRequestStart } from "./types";
export function* orderDeliverRequestStart() {
  takeLatest(
    AdminOrderListTypes.ORDER_DELIVER_REQUEST_START,
    orderDeliveredRequestAsync
  );
}

function* orderDeliveredRequestAsync(action: IOrderDeliveredRequestStart) {
  try {
    const getState = (state: RootState) => state.user;
    const { userInfo } = yield select(getState);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.put(
      `${process.env.DJANGO_API_URL!}/api/orders/${action.payload}/deliver/`,
      config
    );
    yield put(orderDeliveredSuccess(data));
  } catch (error: any) {
    yield put(orderDeliveredFailure(error.message));
  }
}
