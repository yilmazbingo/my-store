import produce from "immer";
import { ProductListActionTypes } from "./action.types";
// import { HYDRATE } from "next-redux-wrapper";
import { Action } from "./types";
import { IProductListState } from "./types";

const INITIAL_STATE = {
  products: [],
  loading: false,
  error: null,
  cart: [],
};

export const productListReducer = produce(
  (state: IProductListState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case ProductListActionTypes.HYDRATE:
        let cartItemsFromStorage = [];
        if (typeof window !== "undefined") {
          cartItemsFromStorage = localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems") as string)
            : [];
        }
        state.cart = cartItemsFromStorage;
        state.products = action.payload;
        return state;

      case ProductListActionTypes.PRODUCT_LIST_START:
      case ProductListActionTypes.PRODUCT_DELETE_START:
      case ProductListActionTypes.PRODUCT_CREATE_REQUEST_START:
      case ProductListActionTypes.PRODUCT_UPDATE_REQUEST_START:
        state.loading = true;
        return state;
      case ProductListActionTypes.PRODUCT_LIST_SUCCESS:
        state.loading = false;
        state.products = action.payload;
        return state;
      case ProductListActionTypes.PRODUCT_DELETE_SUCCESS:
        state.products.filter((product) => product.id !== action.payload);
        state.cart.filter((product) => product.id !== action.payload);
        return state;

      case ProductListActionTypes.PRODUCT_CREATE_SUCCESS:
        state.products.push(action.payload);
        return state;

      case ProductListActionTypes.PRODUCT_UPDATE_SUCCESS:
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
        return state;
      case ProductListActionTypes.PRODUCT_LIST_FAILURE:
      case ProductListActionTypes.PRODUCT_DELETE_FAILURE:
      case ProductListActionTypes.PRODUCT_CREATE_FAILURE:
      case ProductListActionTypes.PRODUCT_UPDATE_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
