// Error: take(patternOrChannel): argument 0 is not valid channel or a valid pattern
//-------- solution is assign them to string values
// export enum CartActionTypes {
//   CARD_ADD_ITEM = "CARD_ADD_ITEM",
//   CARD_REMOVE_ITEM = "CARD_REMOVE_ITEM",
// }

export const CartActionTypes = {
  CARD_ADD_ITEM: "CARD_ADD_ITEM",
  CARD_REMOVE_ITEM: "CARD_REMOVE_ITEM",
  CART_SAVE_SHIPPING_ADDRESS: "CART_SAVE_SHIPPING_ADDRESS",
  CART_SAVE_PAYMENT_METHOD: "CART_SAVE_PAYMENT_METHOD",
  CART_CLEAR_ITEMS: "  CART_CLEAR_ITEMS",
} as const;
