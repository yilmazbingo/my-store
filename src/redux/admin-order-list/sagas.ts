import { all, call } from "redux-saga/effects";
import { adminOrderListRequestStart } from "./order-list-saga";
import { orderDeliverRequestStart } from "./order-delivered-saga";

export function* adminOrderListSagas() {
  yield all([call(adminOrderListRequestStart), call(orderDeliverRequestStart)]);
}
