// sagas are middlewares that if actions comes in function format, they invoke them
// saga is a function that conditionally runs

import { all, call } from "redux-saga/effects";
import { productListSagas } from "./product-list/sagas";
import { userSagas } from "./user/user.saga";
import { userDetailRequestSagas } from "./userDetail/sagas";
import { orderCreateSagas } from "./order-create/sagas";
import { orderDetailRequestSaga } from "./order-detail/sagas";
import { orderPaySagas } from "./order-pay/sagas";
import { myOrderListSagas } from "./my-orders-list/sagas";
import { adminOrderListSagas } from "./admin-order-list/sagas";
import { userListSaga } from "./user-list/sagas";
import { userUpdateSagas } from "./user-update/sagas";
// all concurrently intializes all actions
export default function* rootSaga() {
  // all tells the saga to run all sagas passed to it concurrently and wait for them all to complete
  yield all([
    call(productListSagas),
    call(userSagas),
    call(userDetailRequestSagas),
    call(orderCreateSagas),
    call(orderDetailRequestSaga),
    call(orderPaySagas),
    call(myOrderListSagas),
    call(adminOrderListSagas),
    call(userListSaga),
    call(userUpdateSagas),
  ]);
}
