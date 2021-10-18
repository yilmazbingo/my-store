import produce from "immer";
import { MyOrderListTypes } from "./action.types";
import { Action, IMyOrderListState } from "./types";

const initialState = {
  error: null,
  ordersList: [],
  loading: false,
};

export const myOrderListReducer = produce(
  (state: IMyOrderListState = initialState, action: Action) => {
    switch (action.type) {
      case MyOrderListTypes.MY_ORDER_LIST_REQUEST_START:
        state.loading = true;
        return state;
      case MyOrderListTypes.MY_ORDER_LIST_SUCCESS:
        state.loading = false;
        state.ordersList = action.payload;
        return state;
      case MyOrderListTypes.MY_ORDER_LIST_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      case MyOrderListTypes.MY_ORDER_LIST_RESET:
        state = initialState;
        return state;
      default:
        return state;
    }
  }
);
