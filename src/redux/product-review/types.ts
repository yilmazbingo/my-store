import { ProductReviewActionTypes } from "./action.types";

export interface IProductReviewRequest {
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST;
  payload: { id: string; data: any };
}

export interface IProductReviewSuccess {
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS;
  // payload: any;
}

export interface IProductReviewFailure {
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_FAILURE;
  payload: any;
}

export interface IProductReviewReset {
  type: ProductReviewActionTypes.PRODUCT_CREATE_REVIEW_RESET;
}

export interface IProductReviewState {
  loading: boolean;
  reviewSuccess: boolean;
  error: any;
}

export type Action =
  | IProductReviewFailure
  | IProductReviewRequest
  | IProductReviewSuccess
  | IProductReviewReset;
