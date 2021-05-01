import { CartActionTypes } from "./cart.action.types";
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../rootReducer";
import {
  CartProduct,
  RemoveItem,
  SaveShippingAddress,
  ShippingAddress,
} from "./types";

export const addToCart = (id: number, qty: number): any => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: CartActionTypes.CARD_ADD_ITEM,
      payload: {
        id: data.data.id,
        name: data.data.name,
        image: data.data.image,
        price: data.data.price,
        countInStock: data.data.countInStock,
        qty,
      },
    });
    if (typeof window !== undefined) {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeItem = (item: CartProduct): RemoveItem => ({
  type: CartActionTypes.CARD_REMOVE_ITEM,
  payload: item,
});

export const removeFromCart = (id: number) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  dispatch({
    type: CartActionTypes.CARD_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data: ShippingAddress) => (
  dispatch: Dispatch<SaveShippingAddress>
) => {
  dispatch({
    type: CartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch: Dispatch) => {
  dispatch({
    type: CartActionTypes.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const clearCartItems = () => (dispatch: Dispatch) => {
  dispatch({
    type: CartActionTypes.CART_CLEAR_ITEMS,
  });
  localStorage.removeItem("cartItems");
};
export type Action =
  | ReturnType<typeof addToCart>
  | RemoveItem
  | ReturnType<typeof saveShippingAddress>
  | ReturnType<typeof savePaymentMethod>
  | ReturnType<typeof clearCartItems>;
