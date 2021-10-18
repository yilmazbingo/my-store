import { IOrder } from "../admin-order-list/types";
import { MyOrderListTypes } from "./action.types";
import {
  IMyOrderListRequestStartAction,
  IMyOrderListFailureAction,
  IMyOrderListSuccessAction,
} from "./types";

export const myOrderListRequestStart = (): IMyOrderListRequestStartAction => ({
  type: MyOrderListTypes.MY_ORDER_LIST_REQUEST_START,
});

export const myOrderListSuccess = (
  orders: IOrder
): IMyOrderListSuccessAction => ({
  type: MyOrderListTypes.MY_ORDER_LIST_SUCCESS,
  payload: orders,
});

export const myOrderListFailure = (error: any): IMyOrderListFailureAction => ({
  type: MyOrderListTypes.MY_ORDER_LIST_FAILURE,
  payload: error,
});

export const myOrderListReset = () => ({
  type: MyOrderListTypes.MY_ORDER_LIST_RESET,
});
