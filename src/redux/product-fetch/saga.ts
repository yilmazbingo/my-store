import { call, takeLatest, put, select, all } from "redux-saga/effects";
import axios from "axios";
import { ProductFetchActionTypes } from "./action.types";
import { productFetchSuccess, productFetchFailure } from "./action.creators";
import { IProductFetchStart } from "./types";

function* productFetchStart() {
  yield takeLatest(
    ProductFetchActionTypes.PRODUCT_FETCH_START,
    productFetchAsync
  );
}

function* productFetchAsync(action: IProductFetchStart) {
  try {
    const { data } = yield axios.get(
      `${process.env.DJANGO_API_URL!}/api/products/${action.payload}`
    );
    yield put(productFetchSuccess(data));
  } catch (error: any) {
    yield put(productFetchFailure(error.message));
  }
}

export function* productFetchSaga() {
  yield all([call(productFetchStart)]);
}
