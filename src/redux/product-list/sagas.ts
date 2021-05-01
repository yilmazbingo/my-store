import { call, all } from "redux-saga/effects";
import { fetchProductStart } from "./product.fetch.saga";
import { productDeleteStart } from "./product.delete.saga";
import { productCreateStart } from "./product.create.saga";
import { productUpdateStart } from "./product.update.saga";

export function* productListSagas() {
  yield all([
    call(fetchProductStart),
    call(productDeleteStart),
    call(productCreateStart),
    call(productUpdateStart),
  ]);
}
