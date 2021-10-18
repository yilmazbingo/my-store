import { IUser } from "@/types/interfaces";
import { OrderDetailActionTypes } from "./action.types";
import { IShippingAddress } from "../cart/types";

export interface IOrderDetail {
  createdAt: string;
  deliveredAt: string;
  id: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: IOrderItem[];
  paidAt: string;
  paymentMethod: string;
  shippingAddress: IShippingAddress;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  user: { username: string; email: string };
}

export interface IOrderItem {
  id: number;
  image: string;
  name: string;
  order: number;
  price: string;
  product: number;
  qty: number;
}
export type IOrderUser = Exclude<
  IUser,
  "access" | "refresh" | "token" | "numReviews"
>;

export interface IOrderDetailState {
  loading: boolean;
  orderDetail: IOrderDetail | null;
  error: any;
}

export interface IOrderDetailRequestStart {
  type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST_START;
  payload: string;
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
