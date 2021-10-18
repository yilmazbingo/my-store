import { ProductUpdateActionTypes } from "./action.types";
import { IProduct } from "@/types/interfaces";

export interface IProductUpdateState {
  product: IProduct | null;
  loading: boolean;
  error: any;
}

export interface IProductUpdateStart {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST_START;
  payload: { id: string; data: any };
}

export interface IProductUpdateSuccess {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS;
  payload: any;
}

export interface IProductUpdateFailure {
  type: ProductUpdateActionTypes.PRODUCT_UPDATE_FAILURE;
  payload: any;
}

export type Action =
  | IProductUpdateStart
  | IProductUpdateFailure
  | IProductUpdateSuccess;
