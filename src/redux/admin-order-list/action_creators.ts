import { AdminOrderListTypes } from "./action.types";
import {
  IAdminOrderListRequestStartAction,
  IAdminOrderListFailureAction,
  IAdminOrderListSuccessAction,
  IOrderDeliveredFailure,
  IOrderDeliveredSuccess,
  IOrderDeliveredRequestStart,
  IOrder,
} from "./types";

export const adminOrderListRequestStart =
  (): IAdminOrderListRequestStartAction => ({
    type: AdminOrderListTypes.ADMIN_ORDER_LIST_REQUEST_START,
  });

export const adminOrderListSuccess = (
  orders: IOrder
): IAdminOrderListSuccessAction => ({
  type: AdminOrderListTypes.ADMIN_ORDER_LIST_SUCCESS,
  payload: orders,
});

export const adminOrderListFailure = (
  error: any
): IAdminOrderListFailureAction => ({
  type: AdminOrderListTypes.ADMIN_ORDER_LIST_FAILURE,
  payload: error,
});

export const orderDeliveredRequestStart = (
  id: string
): IOrderDeliveredRequestStart => ({
  type: AdminOrderListTypes.ORDER_DELIVER_REQUEST_START,
  payload: id,
});

export const orderDeliveredSuccess = (data: any): IOrderDeliveredSuccess => ({
  type: AdminOrderListTypes.ORDER_DELIVER_SUCCESS,
  payload: data,
});

export const orderDeliveredFailure = (error: any): IOrderDeliveredFailure => ({
  type: AdminOrderListTypes.ORDER_DELIVER_FAILURE,
  payload: error,
});
