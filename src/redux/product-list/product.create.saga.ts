import { RootState } from "@/redux/rootReducer";
import { createProductSuccess, createProductFailure } from "./actions";
import { takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import { ProductListActionTypes } from "./action.types";

export function* productCreateStart() {
  yield takeLatest(
    ProductListActionTypes.PRODUCT_CREATE_REQUEST_START,
    productCreateAsync
  );
}

function* productCreateAsync(action) {
  try {
    const getState = (state: RootState) => state.user;
    const { userInfo } = yield select(getState);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.post(
      `${process.env.DJANGO_API_URL!}/api/products/create/`,
      action.payload,
      config
    );

    yield put(createProductSuccess(data));
  } catch (e) {
    yield put(createProductFailure(e.message));
  }
}
