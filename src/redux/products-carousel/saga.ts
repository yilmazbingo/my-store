import { call, put, all, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { CarouselProductsActionTypes } from "./action.types";
import {
  carouselProductsRequestSuccess,
  carouselProductsRequestFailure,
} from "./action.creators";

export function* carouselProductsStart() {
  yield takeLatest(
    CarouselProductsActionTypes.CAROUSEL_PRODUCTS_REQUEST_START,
    carouselProductsStartAsync
  );
}

export function* carouselProductsStartAsync() {
  try {
    const { data } = yield axios.get(
      `${process.env.DJANGO_API_URL!}/api/products/top/`
    );
    yield put(carouselProductsRequestSuccess(data));
  } catch (error) {
    yield put(carouselProductsRequestFailure(error.message));
  }
}

export function* carouselProductsSaga() {
  yield all([call(carouselProductsStart)]);
}
