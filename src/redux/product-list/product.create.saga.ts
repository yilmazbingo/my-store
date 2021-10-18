import { RootState } from "@/redux/rootReducer";
import { createProductSuccess, createProductFailure } from "./actions";
import { takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import { ProductListActionTypes } from "./action.types";
import Router from "next/router";
import { IProductCreateStart } from "./types";

export function* productCreateStart() {
  yield takeLatest(
    ProductListActionTypes.PRODUCT_CREATE_REQUEST_START,
    productCreateAsync
  );
}

function* productCreateAsync(action: IProductCreateStart) {
  try {
    const getState = (state: RootState) => state.user;
    const { userInfo } = yield select(getState);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log("action payload to create product", action);
    const { data } = yield axios.post(
      `${process.env.DJANGO_API_URL!}/api/products/create/`,
      action.payload,
      config
    );
    console.log("data in after creating product", data);

    yield put(createProductSuccess(data));
    Router.push(`${process.env.BASE_URL}/admin/productlist`);
  } catch (e: any) {
    yield put(createProductFailure(e.message));
  }
}
