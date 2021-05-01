import { RootState } from "@/redux/rootReducer";
import { productDeleteSuccess, productDeleteFailur } from "./actions";
import { takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";
import { ProductListActionTypes } from "./action.types";

export function* productDeleteStart() {
  yield takeLatest(
    ProductListActionTypes.PRODUCT_DELETE_START,
    productDeleteAsync
  );
}

function* productDeleteAsync(action) {
  try {
    const getState = (state: RootState) => state.user;
    const { userInfo } = yield select(getState);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = yield axios.delete(
      `${process.env.DJANGO_API_URL!}/api/products/delete/${action.payload}/`,
      config
    );
    yield put(productDeleteSuccess(action.payload));
  } catch (e) {
    yield put(productDeleteFailur(e.message));
  }
}
