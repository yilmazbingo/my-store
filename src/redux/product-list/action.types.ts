// Error: take(patternOrChannel): argument 0 is not valid channel or a valid pattern
// solution is assign them to string values
export enum ProductListActionTypes {
  PRODUCT_LIST_START = "PRODUCT_LIST_START",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE",
  PRODUCT_DELETE_START = "PRODUCT_DELETE_START",
  PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS",
  PRODUCT_DELETE_FAILURE = "PRODUCT_DELETE_FAILURE",
  PRODUCT_CREATE_REQUEST_START = "PRODUCT_CREATE_REQUEST_START",
  PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS",
  PRODUCT_CREATE_FAILURE = "PRODUCT_CREATE_FAILURE",
  PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET",
  PRODUCT_UPDATE_REQUEST_START = "PRODUCT_UPDATE_REQUEST_START",
  PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS",
  PRODUCT_UPDATE_FAILURE = "PRODUCT_UPDATE_FAILURE",
  PRODUCT_UPDATE_RESET = "PRODUCT_UPDATE_RESET",
  HYDRATE = "__NEXT_REDUX_WRAPPER_HYDRATE__",
}

// export const ProductListActionTypes = {
//   PRODUCT_LIST_START: "PRODUCT_LIST_START",
//   PRODUCT_LIST_SUCCESS: "PRODUCT_LIST_SUCCESS",
//   PRODUCT_LIST_FAILURE: "PRODUCT_LIST_FAILURE",
// } as const;
