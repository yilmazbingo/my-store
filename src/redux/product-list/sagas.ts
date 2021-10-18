import { call, all } from "redux-saga/effects";
import { fetchProductStart } from "./products.fetch.saga";
import { productDeleteStart } from "./product.delete.saga";
import { productCreateStart } from "./product.create.saga";

export function* productListSagas() {
  yield all([
    call(fetchProductStart),
    call(productDeleteStart),
    call(productCreateStart),
  ]);
}
