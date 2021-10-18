import { takeLatest, all, call, select, put } from "redux-saga/effects";
import axios from "axios";
import { MyOrderListTypes } from "./action.types";
import { myOrderListSuccess, myOrderListFailure } from "./actions";
import { RootState } from "../rootReducer";

function* myOrderListRequestStart() {
  yield takeLatest(
    MyOrderListTypes.MY_ORDER_LIST_REQUEST_START,
    myOrderListRequestAsync
  );
}

function* myOrderListRequestAsync() {
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
      `${process.env.DJANGO_API_URL!}/api/orders/myorders/`,
      config
    );
    yield put(myOrderListSuccess(data));
  } catch (e: any) {
    yield put(myOrderListFailure(e.message));
  }
}

export function* myOrderListSagas() {
  yield all([call(myOrderListRequestStart)]);
}
