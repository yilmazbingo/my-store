import { OrderPayActionTypes } from "./action.types";
import {
  IOrderPayReset,
  IOrderPayStart,
  IOrderPaySuccess,
  IOrderPayFailure,
} from "./types";

export const orderPayStart = (
  id: string,
  paymentResult: any
): IOrderPayStart => ({
  type: OrderPayActionTypes.ORDER_PAY_REQUEST_START,
  payload: { id, paymentResult },
});

export const orderPaySuccess = (data: any): IOrderPaySuccess => ({
  type: OrderPayActionTypes.ORDER_PAY_SUCCESS,
  payload: data,
});

export const orderPayFailure = (error: any): IOrderPayFailure => ({
  type: OrderPayActionTypes.ORDER_PAY_FAILURE,
  payload: error,
});

export const orderPayReset = (): IOrderPayReset => ({
  type: OrderPayActionTypes.ORDER_PAY_RESET,
});
