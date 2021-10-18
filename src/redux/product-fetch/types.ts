import { ProductFetchActionTypes } from "./action.types";
import { IProduct } from "@/types/interfaces";

export interface IProductState {
  product: IProduct | null;
  loading: boolean;
  error: any;
}

export interface IProductFetchStart {
  type: ProductFetchActionTypes.PRODUCT_FETCH_START;
  payload: string;
}

export interface IProductFetchSuccess {
  type: ProductFetchActionTypes.PRODUCT_FETCH_SUCCESS;
  payload: IProduct;
}

export interface IProductFetchFailure {
  type: ProductFetchActionTypes.PRODUCT_FETCH_FAILURE;
  payload: any;
}

export type Action =
  | IProductFetchStart
  | IProductFetchSuccess
  | IProductFetchFailure;
