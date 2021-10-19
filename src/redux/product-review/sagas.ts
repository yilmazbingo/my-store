import { call, put, select, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import { ProductReviewActionTypes } from "./action.types";
import { productReviewSuccess, productReviewFailure } from "./action.creators";
import { RootState } from "../rootReducer";
import { IProductReviewRequest } from "./types";
import Router from "next/router";

function* productReviewStart() {
  yield takeLatest(
    ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
    productReviewStartAsync
  );
}

function* productReviewStartAsync(action: IProductReviewRequest) {
  try {
    const getUser = (state: RootState) => state.user;
    const { userInfo } = yield select(getUser);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.post(
      `${process.env.DJANGO_API_URL!}/api/products/${
        action.payload.id
      }/reviews/`,
      action.payload.data,
      config
    );

    yield put(productReviewSuccess());
    Router.reload();
  } catch (error: any) {
    yield put(productReviewFailure(error.message));
  }
}

export function* productReviewSagas() {
  yield all([call(productReviewStart)]);
}
