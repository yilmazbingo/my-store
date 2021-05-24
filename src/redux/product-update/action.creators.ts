import { ProductUpdateActionTypes } from "./action.types";
import {
  IProductUpdateStart,
  IProductUpdateSuccess,
  IProductUpdateFailure,
} from "./types";

export const productUpdateStart = (
  id: string,
  data: any
): IProductUpdateStart => ({
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST_START,
  payload: { id, data },
});

export const productUpdateSuccess = (data): IProductUpdateSuccess => ({
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
  payload: data,
});

export const productUpdateFailure = (error: any): IProductUpdateFailure => ({
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE,
  payload: error,
});
