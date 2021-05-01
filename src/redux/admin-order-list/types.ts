import { AdminOrderListTypes } from "./action.types";

export interface IMyOrderListState {
  loading: boolean;
  error: any;
  ordersList: any;
}

export interface IAdminOrderListRequestStartAction {
  type: AdminOrderListTypes.ADMIN_ORDER_LIST_REQUEST_START;
}

export interface IAdminOrderListSuccessAction {
  type: AdminOrderListTypes.ADMIN_ORDER_LIST_SUCCESS;
  payload: any;
}

export interface IAdminOrderListFailureAction {
  type: AdminOrderListTypes.ADMIN_ORDER_LIST_FAILURE;
  payload: any;
}

export interface IOrderDeliveredRequestStart {
  type: AdminOrderListTypes.ORDER_DELIVER_REQUEST_START;
  payload: string;
}

export interface IOrderDeliveredSuccess {
  type: AdminOrderListTypes.ORDER_DELIVER_SUCCESS;
  payload: any;
}

export interface IOrderDeliveredFailure {
  type: AdminOrderListTypes.ORDER_DELIVER_FAILURE;
  payload: any;
}

export type Action =
  | IAdminOrderListFailureAction
  | IAdminOrderListRequestStartAction
  | IAdminOrderListSuccessAction
  | IOrderDeliveredRequestStart
  | IOrderDeliveredSuccess
  | IOrderDeliveredFailure;
