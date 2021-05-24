import { IProduct } from "@/types/interfaces";
import { ProductListActionTypes } from "./action.types";
import * as actions from "./types";
// import { HYDRATE } from "next-redux-wrapper";

export const fetchProductsStart = (
  queryParams: string
): actions.IFetchProductsStart => ({
  type: ProductListActionTypes.PRODUCT_LIST_START,
  payload: queryParams,
});

export const fetchProductSuccess = (
  products: IProduct[]
): actions.IFetchProductSuccess => ({
  type: ProductListActionTypes.PRODUCT_LIST_SUCCESS,
  payload: products,
});

export const fetchProductFailure = (
  error: any
): actions.IFetchProductFailure => ({
  type: ProductListActionTypes.PRODUCT_LIST_FAILURE,
  payload: error,
});

export const createProductStart = (
  productData
): actions.IProductCreateStart => ({
  type: ProductListActionTypes.PRODUCT_CREATE_REQUEST_START,
  payload: productData,
});

export const createProductSuccess = (data): actions.IProductCreateSuccess => ({
  type: ProductListActionTypes.PRODUCT_CREATE_SUCCESS,
  payload: data,
});

export const createProductFailure = (
  error: any
): actions.IProductCreateFailure => ({
  type: ProductListActionTypes.PRODUCT_CREATE_FAILURE,
  payload: error,
});

export const productDeleteStart = (
  id: string
): actions.IProductDeleteStart => ({
  type: ProductListActionTypes.PRODUCT_DELETE_START,
  payload: id,
});

export const productDeleteSuccess = (
  id: string
): actions.IProductDeleteSuccess => ({
  type: ProductListActionTypes.PRODUCT_DELETE_SUCCESS,
  payload: id,
});

export const productDeleteFailur = (
  error: any
): actions.IProductDeleteFailure => ({
  type: ProductListActionTypes.PRODUCT_DELETE_FAILURE,
  payload: error,
});

export const hydrate = (): actions.Hydrate => ({
  type: ProductListActionTypes.HYDRATE,
});

// export type Action =
//   | ReturnType<typeof fetchProductsStart>
//   | ReturnType<typeof fetchProductSuccess>
//   | ReturnType<typeof fetchProductFailure>
//   | ReturnType<typeof hydrate>;
