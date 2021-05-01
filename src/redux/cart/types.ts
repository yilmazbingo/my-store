import { IProduct } from "@/types/interfaces";
import { CartActionTypes } from "./cart.action.types";

export interface CartState {
  cartItems: CartProduct[];
  shippingAddress: IShippingAddress | null;
  paymentMethod: string | null;
  cartItemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface IShippingAddress {
  id?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  orderId: number;
  shippingPrice: number | null;
}

export type CartProduct = Exclude<
  IProduct,
  "rating" | "description" | "category" | "numReviews"
>;

export interface RemoveItem {
  type: string;
  payload: CartProduct;
}

export interface SaveShippingAddress {
  type: string;
  payload: ShippingAddress;
}
