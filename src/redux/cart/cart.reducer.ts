import produce from "immer";
import { CartActionTypes } from "./cart.action.types";
import { CartState, CartProduct } from "./types";
import { Action } from "./cart.actions";

// i have to initalize the value as null otherwise server error
let shippingAddressFromStorage = null;
let paymentMethodFromStorage = null;
let cartItemsFromStorage = null;
let priceOfCartItemsFromStorage = 0;
let shippingPriceOfCartItemsFromStorage = 0;
let taxPriceOfCartItemsFromStorage = 0;
let totalPrice = 0;

if (typeof window !== "undefined") {
  shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress") as string)
    : null;
  paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod") as string)
    : null;
  cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [];
}

priceOfCartItemsFromStorage = cartItemsFromStorage
  ? Number(
      cartItemsFromStorage
        .reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
        .toFixed(2)
    )
  : 0;

shippingPriceOfCartItemsFromStorage = priceOfCartItemsFromStorage
  ? Number((priceOfCartItemsFromStorage > 100 ? 0 : 10).toFixed(2))
  : 0;

taxPriceOfCartItemsFromStorage = priceOfCartItemsFromStorage
  ? Number((0.082 * priceOfCartItemsFromStorage).toFixed(2))
  : 0;

totalPrice =
  taxPriceOfCartItemsFromStorage +
  shippingPriceOfCartItemsFromStorage +
  priceOfCartItemsFromStorage;

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
  cartItemsPrice: priceOfCartItemsFromStorage,
  shippingPrice: shippingPriceOfCartItemsFromStorage,
  taxPrice: taxPriceOfCartItemsFromStorage,
  totalPrice,
};

console.log("cartitems stora", cartItemsFromStorage);
export const cartReducer = produce(
  (state: CartState = initialState, action: Action): CartState => {
    switch (action.type) {
      case CartActionTypes.CARD_ADD_ITEM:
        const item: CartProduct = action.payload;
        const existItem = state.cartItems.find((i) => i.id === item.id);
        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
          );
        } else {
          // i should not assign state.carItems=state.cartItems.push(item) because array.push type returns number
          state.cartItems.push(item);
        }
        return state;
      case CartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
        state.shippingAddress = action.payload;
        return state;

      case CartActionTypes.CARD_REMOVE_ITEM:
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        return state;
      case CartActionTypes.CART_SAVE_PAYMENT_METHOD:
        state.paymentMethod = action.payload;
        return state;
      case CartActionTypes.CART_CLEAR_ITEMS:
        state.cartItems = [];
        return state;

      default:
        return state;
    }
  }
);

// spread operator in strict mode is not allowed
