import { takeLatest, select, put } from "redux-saga/effects";
import axios from "axios";
import { AdminOrderListTypes } from "./action.types";
import {
  adminOrderListSuccess,
  adminOrderListFailure,
} from "./action_creators";
import { RootState } from "../rootReducer";

export function* adminOrderListRequestStart() {
  yield takeLatest(
    AdminOrderListTypes.ADMIN_ORDER_LIST_REQUEST_START,
    adminOrderListRequestAsync
  );
}

function* adminOrderListRequestAsync() {
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
      `${process.env.DJANGO_API_URL!}/api/orders/`,
      config
    );
    yield put(adminOrderListSuccess(data));
  } catch (e: any) {
    yield put(adminOrderListFailure(e.message));
  }
}
