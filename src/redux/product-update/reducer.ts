import produce from "immer";
import { Action, IProductUpdateState } from "./types";
import { ProductUpdateActionTypes } from "./action.types";

const initialState = {
  product: null,
  loading: false,
  error: null,
};

export const productUpdateReducer = produce(
  (state: IProductUpdateState = initialState, action: Action) => {
    switch (action.type) {
      case ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST_START:
        state.loading = true;
        return state;
      case ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS:
        state.product = action.payload;
        state.loading = false;
        return state;
      case ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
