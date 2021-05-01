import { RootState } from "../rootReducer";
import { takeLatest, select, put } from "redux-saga/effects";
import { ProductListActionTypes } from "./action.types";
import axios from "axios";
import { productUpdateFailure, productUpdateSuccess } from "./actions";

export function* productUpdateStart() {
  yield takeLatest(
    ProductListActionTypes.PRODUCT_UPDATE_REQUEST_START,
    productUpdateAsync
  );
}

function* productUpdateAsync(action) {
  try {
    const getState = (state: RootState) => state.user;
    const { userInfo } = yield select(getState);
    const config = {
      headers: {
        "Content/type": "application/json",
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
  } catch (e) {
    yield put(productUpdateFailure(e.message));
  }
}
