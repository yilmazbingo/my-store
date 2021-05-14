import { IProduct } from "@/types/interfaces";
import { ProductListActionTypes } from "./action.types";
import * as actions from "./types";
// import { HYDRATE } from "next-redux-wrapper";

export const fetchProductsStart = (
  keyword: string
): actions.IFetchProductsStart => ({
  type: ProductListActionTypes.PRODUCT_LIST_START,
  payload: keyword,
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

export const productUpdateStart = (
  id: string,
  data: any
): actions.IProductUpdateStart => ({
  type: ProductListActionTypes.PRODUCT_UPDATE_REQUEST_START,
  payload: { id, data },
});

export const productUpdateSuccess = (data): actions.IProductUpdateSuccess => ({
  type: ProductListActionTypes.PRODUCT_UPDATE_SUCCESS,
  payload: data,
});

export const productUpdateFailure = (
  error: any
): actions.IProductUpdateFailure => ({
  type: ProductListActionTypes.PRODUCT_UPDATE_FAILURE,
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
