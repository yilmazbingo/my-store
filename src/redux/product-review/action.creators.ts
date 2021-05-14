import { ProductReviewActionTypes } from "./action.types";
import {
  IProductReviewReset,
  IProductReviewFailure,
  IProductReviewRequest,
  IProductReviewSuccess,
} from "./types";

export const productReviewRequestStart = (
  id: string,
  data: any
): IProductReviewRequest => ({
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
  payload: { id, data },
});

export const productReviewSuccess = (): IProductReviewSuccess => ({
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
});

export const productReviewFailure = (error: any): IProductReviewFailure => ({
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE,
  payload: error,
});

export const productReviewReset = (): IProductReviewReset => ({
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET,
});
