import produce from "immer";
import { Action, CarouselProductsState } from "./types";
import { CarouselProductsActionTypes } from "./action.types";

const defaultState = {
  loading: false,
  error: null,
  products: [],
};

export const carouselProductsReducer = produce(
  (state: CarouselProductsState = defaultState, action: Action) => {
    switch (action.type) {
      case CarouselProductsActionTypes.CAROUSEL_PRODUCTS_REQUEST_START:
        state.loading = true;
        return state;
      case CarouselProductsActionTypes.CAROUSEL_PRODUCTS_SUCCESS:
        state.loading = false;
        state.products = action.payload;
        return state;
      case CarouselProductsActionTypes.CAROUSEL_PRODUCTS_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
