import produce from "immer";
import { ProductFetchActionTypes } from "./action.types";
import { IProductState, Action } from "./types";

const defaultState = {
  product: null,
  loading: false,
  error: null,
};

export const productFetchReducer = produce(
  (state: IProductState = defaultState, action: Action) => {
    switch (action.type) {
      case ProductFetchActionTypes.PRODUCT_FETCH_START:
        state.loading = true;
        return state;
      case ProductFetchActionTypes.PRODUCT_FETCH_SUCCESS:
        state.loading = false;
        state.product = action.payload;
        return state;
      case ProductFetchActionTypes.PRODUCT_FETCH_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
