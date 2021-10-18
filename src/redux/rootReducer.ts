import { orderCreateReducer } from "./order-create/reducer";
import { combineReducers } from "redux";
import { userLoginReducer } from "./user/user.reducer";
import { productListReducer } from "./product-list/reducer";
import { cartReducer } from "./cart/cart.reducer";
import { userDetailReducer } from "./userDetail/reducer";
import { OrderDetailReducer } from "./order-detail/reducer";
import { orderPayReducer } from "./order-pay/reducer";
import { myOrderListReducer } from "./my-orders-list/reducer";
import { userListReducer } from "./user-list/reducer";
import { userUpdateReducer } from "./user-update/reducer";
import { adminOrderListReducer } from "./admin-order-list/reducer";
import { productReviewCreateReducer } from "./product-review/reducer";
import { carouselProductsReducer } from "./products-carousel/reducer";
import { productUpdateReducer } from "./product-update/reducer";
import { productFetchReducer } from "./product-fetch/reducer";
import { userRegisterReducer } from "./user-register/user-register-reducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  user: userLoginReducer,
  userDetail: userDetailReducer,
  orderCreate: orderCreateReducer,
  orderDetail: OrderDetailReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  adminOrderList: adminOrderListReducer,
  productReview: productReviewCreateReducer,
  carouselProducts: carouselProductsReducer,
  productUpdate: productUpdateReducer,
  productDetail: productFetchReducer,
  userRegister: userRegisterReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
/*
-reducer must return any value beside "undefined". we can return null
- arguments of reducer is "previous state" and action
- when you start up the redux application, each reducer will be automatically called exactly one time. in this case we return default state. 
- reducers are pure functions. 
- must not mutate its input "state". react wont rerender if state does not change
*/
