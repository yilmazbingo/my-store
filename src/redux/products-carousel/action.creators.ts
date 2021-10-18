import { CarouselProductsActionTypes } from "./action.types";
import {
  CarouselProductsRequestStart,
  CarouselProductsRequestSuccess,
  CarouselProductsRequestFailure,
} from "./types";

export const carouselProductsRequestStart =
  (): CarouselProductsRequestStart => ({
    type: CarouselProductsActionTypes.CAROUSEL_PRODUCTS_REQUEST_START,
  });

export const carouselProductsRequestSuccess = (
  data: any
): CarouselProductsRequestSuccess => ({
  type: CarouselProductsActionTypes.CAROUSEL_PRODUCTS_SUCCESS,
  payload: data,
});

export const carouselProductsRequestFailure = (
  error: any
): CarouselProductsRequestFailure => ({
  type: CarouselProductsActionTypes.CAROUSEL_PRODUCTS_FAILURE,
  payload: error,
});
