import { MyOrderListTypes } from "./action.types";

export interface IMyOrderListState {
  loading: boolean;
  error: any;
  ordersList: any;
}

export interface IMyOrderListRequestStartAction {
  type: MyOrderListTypes.MY_ORDER_LIST_REQUEST_START;
}

export interface IMyOrderListSuccessAction {
  type: MyOrderListTypes.MY_ORDER_LIST_SUCCESS;
  payload: any;
}

export interface IMyOrderListFailureAction {
  type: MyOrderListTypes.MY_ORDER_LIST_FAILURE;
  payload: any;
}

export interface IMyOrderListResetAction {
  type: MyOrderListTypes.MY_ORDER_LIST_RESET;
}

export type Action =
  | IMyOrderListFailureAction
  | IMyOrderListRequestStartAction
  | IMyOrderListSuccessAction
  | IMyOrderListResetAction;
