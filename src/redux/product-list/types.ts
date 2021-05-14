import { ProductListActionTypes } from "./action.types";
import { END } from "redux-saga";
import { IProduct } from "@/types/interfaces";

export interface IProductListState {
  products: IProduct[];
  loading: boolean;
  error: any;
  cart: IProduct[] | [];
}
export interface IFetchProductsStart {
  type: ProductListActionTypes.PRODUCT_LIST_START;
  payload: string;
}

export interface IFetchProductSuccess {
  type: ProductListActionTypes.PRODUCT_LIST_SUCCESS;
  payload: IProduct[];
}

export interface IFetchProductFailure {
  type: ProductListActionTypes.PRODUCT_LIST_FAILURE;
  payload: any;
}

export interface IProductCreateStart {
  type: ProductListActionTypes.PRODUCT_CREATE_REQUEST_START;
  payload: any;
}

export interface IProductCreateSuccess {
  type: ProductListActionTypes.PRODUCT_CREATE_SUCCESS;
  payload: any;
}

export interface IProductCreateFailure {
  type: ProductListActionTypes.PRODUCT_CREATE_FAILURE;
  payload: any;
}

export interface IProductUpdateStart {
  type: ProductListActionTypes.PRODUCT_UPDATE_REQUEST_START;
  payload: { id: string; data: any };
}

export interface IProductUpdateSuccess {
  type: ProductListActionTypes.PRODUCT_UPDATE_SUCCESS;
  payload: any;
}

export interface IProductUpdateFailure {
  type: ProductListActionTypes.PRODUCT_UPDATE_FAILURE;
  payload: any;
}
export interface IProductDeleteStart {
  type: ProductListActionTypes.PRODUCT_DELETE_START;
  payload: string;
}

export interface IProductDeleteSuccess {
  type: ProductListActionTypes.PRODUCT_DELETE_SUCCESS;
  payload: string;
}

export interface IProductDeleteFailure {
  type: ProductListActionTypes.PRODUCT_DELETE_FAILURE;
  payload: any;
}

export interface Hydrate {
  type: ProductListActionTypes.HYDRATE;
}

export type Action =
  | IFetchProductsStart
  | IFetchProductSuccess
  | IFetchProductFailure
  | IProductDeleteStart
  | IProductDeleteSuccess
  | IProductDeleteFailure
  | IProductCreateStart
  | IProductCreateSuccess
  | IProductCreateFailure
  | IProductUpdateStart
  | IProductUpdateFailure
  | IProductUpdateSuccess
  | END
  | Hydrate;
