import { IProduct } from "./../../types/interfaces/index";
import { CarouselProductsActionTypes } from "./action.types";

export interface CarouselProductsState {
  loading: boolean;
  error: any;
  products: IProduct[];
}

export interface CarouselProductsRequestStart {
  type: CarouselProductsActionTypes.CAROUSEL_PRODUCTS_REQUEST_START;
}

export interface CarouselProductsRequestSuccess {
  type: CarouselProductsActionTypes.CAROUSEL_PRODUCTS_SUCCESS;
  payload: any;
}

export interface CarouselProductsRequestFailure {
  type: CarouselProductsActionTypes.CAROUSEL_PRODUCTS_FAILURE;
  payload: any;
}

export type Action =
  | CarouselProductsRequestFailure
  | CarouselProductsRequestStart
  | CarouselProductsRequestSuccess;
