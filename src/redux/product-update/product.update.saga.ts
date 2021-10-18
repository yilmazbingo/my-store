import { RootState } from "../rootReducer";
import { takeLatest, select, put, call } from "redux-saga/effects";
import { ProductUpdateActionTypes } from "./action.types";
import axios from "axios";
import Router from "next/router";
import { productUpdateFailure, productUpdateSuccess } from "./action.creators";
import { IProductUpdateStart } from "./types";

function* productUpdateStart() {
  yield takeLatest(
    ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST_START,
    productUpdateAsync
  );
}

function* productUpdateAsync(action: IProductUpdateStart) {
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
      `${process.env.DJANGO_API_URL!}/api/products/update/${
        action.payload.id
      }/`,
      action.payload.data,
      config
    );
    yield put(productUpdateSuccess(data));
    Router.push(`${process.env.BASE_URL}/admin/productlist`);
  } catch (e: any) {
    yield put(productUpdateFailure(e.message));
  }
}

export function* productUpdateSaga() {
  yield call(productUpdateStart);
}
