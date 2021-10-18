import { MyOrderListTypes } from "./action.types";

interface ShippingAddress {
  id: number;
  address: string;
  city: string;
  country: string;
  order: number;
  postalCode: number;
  shippingPrice: number | null;
}
interface Order {
  id: number;
  deliveredAt: Date | null;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: any;
  paidAt: string | null;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: { username: string; email: string };
}

export interface IMyOrderListState {
  loading: boolean;
  error: any;
  ordersList: Order[];
}

export interface IMyOrderListRequestStartAction {
  type: MyOrderListTypes.MY_ORDER_LIST_REQUEST_START;
}

export interface IMyOrderListSuccessAction {
  type: MyOrderListTypes.MY_ORDER_LIST_SUCCESS;
  payload: any;
}

export interface IMyOrderListFailureAction {
  type: MyOrderListTypes.MY_ORDER_LIST_FAILURE;
  payload: any;
}

export interface IMyOrderListResetAction {
  type: MyOrderListTypes.MY_ORDER_LIST_RESET;
}

export type Action =
  | IMyOrderListFailureAction
  | IMyOrderListRequestStartAction
  | IMyOrderListSuccessAction
  | IMyOrderListResetAction;
