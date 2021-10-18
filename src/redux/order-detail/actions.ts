import { OrderDetailActionTypes } from "./action.types";
import { IOrderDetail } from "./types";

export const orderDetailRequestStart = (id: string) => ({
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_START,
  payload: id,
});

export const orderDetailRequestSuccess = (orderDetail: IOrderDetail) => ({
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_SUCCESS,
  payload: orderDetail,
});

export const orderDetailRequestFailure = (error: any) => ({
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_FAILURE,
  payload: error,
});
