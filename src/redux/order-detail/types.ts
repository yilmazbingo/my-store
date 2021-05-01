import { IUser } from "@/types/interfaces";
import { OrderDetailActionTypes } from "./action.types";
import { IShippingAddress } from "../cart/types";

export interface IOrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  product: number;
  order: number;
  qty: number;
}
export type IOrderUser = Exclude<
  IUser,
  "access" | "refresh" | "token" | "numReviews"
>;

export interface IOrderDetail {
  id: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  user: IOrderUser;
}
export interface IOrderDetailState {
  loading: boolean;
  orderDetail: IOrderDetail | null;
  error: any;
}

export interface IOrderDetailRequestStart {
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_START;
  id: string;
}

export interface IOrderDetailRequestSuccess {
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_SUCCESS;
  payload: IOrderDetail;
}

export interface IOrderDetailRequestFailure {
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_FAILURE;
  payload: any;
}

export type Action =
  | IOrderDetailRequestStart
  | IOrderDetailRequestSuccess
  | IOrderDetailRequestFailure;
