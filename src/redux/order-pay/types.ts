import { OrderPayActionTypes } from "./action.types";

export interface IOrderPayState {
  loading: boolean;
  orderPaid: any;
  error: any;
}

export interface IOrderPayStart {
  type: OrderPayActionTypes.ORDER_PAY_REQUEST_START;
  payload: { id: string; paymentResult: any };
}

export interface IOrderPaySuccess {
  type: OrderPayActionTypes.ORDER_PAY_SUCCESS;
  payload: any;
}

export interface IOrderPayFailure {
  type: OrderPayActionTypes.ORDER_PAY_FAILURE;
  payload: any;
}

export interface IOrderPayReset {
  type: OrderPayActionTypes.ORDER_PAY_RESET;
}

export type IAction =
  | IOrderPayStart
  | IOrderPaySuccess
  | IOrderPayFailure
  | IOrderPayReset;
