import { OrderCreateActionTypes } from "./action.types";
import {
  OrderCreateStart,
  OrderCreateSuccess,
  OrderCreateFailure,
} from "./types";

export const orderCreateStart = (data: any): OrderCreateStart => ({
  type: OrderCreateActionTypes.ORDER_CREATE_START,
  payload: data,
});

export const orderCreateSuccess = (data: any): OrderCreateSuccess => ({
  type: OrderCreateActionTypes.ORDER_CREATE_SUCCESS,
  payload: data,
});

export const orderCreateFailure = (error: any): OrderCreateFailure => ({
  type: OrderCreateActionTypes.ORDER_CREATE_FAILURE,
  payload: error,
});

export const orderReset = () => ({
  type: OrderCreateActionTypes.ORDER_CREATE_RESET,
});
