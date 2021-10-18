import { IUser } from "@/types/interfaces";
import { AdminOrderListTypes } from "./action.types";

export interface IOrder {
  id: number;
  user: IUser;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  createdAt: string;
}

export interface IMyOrderListState {
  loading: boolean;
  error: any;
  orders: IOrder[];
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
