import { IProduct } from "../../types/interfaces/index";
import { fetchProductSuccess, fetchProductFailure } from "./actions";
import { call, takeLatest, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { ProductListActionTypes } from "./action.types";

export function* fetchProductStart() {
  yield takeLatest(
    ProductListActionTypes.PRODUCT_LIST_START,
    fetchProductsAsync
  );
}

function* fetchProductsAsync() {
  console.log("fetching products");
  try {
    const res: AxiosResponse<IProduct[]> = yield axios.get(
      `${process.env.DJANGO_API_URL!}/api/products/`
    );
    yield put(fetchProductSuccess(res.data));
  } catch (e) {
    console.log("error in fetching", e);
    yield put(
      fetchProductFailure(
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message
      )
    );
  }
}
