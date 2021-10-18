import { OrderCreateActionTypes } from "./action.types";

export interface OrderState {
  loading: boolean;
  error: any;
  order: any;
}
export interface OrderCreateStart {
  type: OrderCreateActionTypes.ORDER_CREATE_START;
  payload: any;
}

export interface OrderCreateSuccess {
  type: OrderCreateActionTypes.ORDER_CREATE_SUCCESS;
  payload: any;
}

export interface OrderCreateFailure {
  type: OrderCreateActionTypes.ORDER_CREATE_FAILURE;
  payload: any;
}

export interface OrderReset {
  type: OrderCreateActionTypes.ORDER_CREATE_RESET;
}
export type Action =
  | OrderCreateStart
  | OrderCreateSuccess
  | OrderCreateFailure
  | OrderReset;
