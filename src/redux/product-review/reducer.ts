import produce from "immer";
import { ProductReviewActionTypes } from "./action.types";
import { Action, IProductReviewState } from "./types";

const initialState = {
  loading: false,
  reviewSuccess: false,
  error: null,
};

export const productReviewCreateReducer = produce(
  (state: IProductReviewState = initialState, action: Action) => {
    switch (action.type) {
      case ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
        state.loading = true;
        return state;

      case ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
        state.loading = false;
        state.reviewSuccess = true;
        return state;

      case ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET:
        state = initialState;
        return state;

      default:
        return state;
    }
  }
);
