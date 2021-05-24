import { IProduct } from "./../../types/interfaces/index";
import { ProductFetchActionTypes } from "./action.types";
import {
  IProductFetchStart,
  IProductFetchFailure,
  IProductFetchSuccess,
} from "./types";

export const productFetchStart = (id: string): IProductFetchStart => ({
  type: ProductFetchActionTypes.PRODUCT_FETCH_START,
  payload: id,
});

export const productFetchSuccess = (
  product: IProduct
): IProductFetchSuccess => ({
  type: ProductFetchActionTypes.PRODUCT_FETCH_SUCCESS,
  payload: product,
});

export const productFetchFailure = (error: any): IProductFetchFailure => ({
  type: ProductFetchActionTypes.PRODUCT_FETCH_FAILURE,
  payload: error,
});
