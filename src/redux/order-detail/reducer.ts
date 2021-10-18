import produce from "immer";
import { IOrderDetailState, Action } from "./types";
import { OrderDetailActionTypes } from "./action.types";

const initialState = {
  loading: false,
  orderDetail: null,
  error: null,
};

export const OrderDetailReducer = produce(
  (
    state: IOrderDetailState = initialState,
    action: Action
  ): IOrderDetailState => {
    switch (action.type) {
      case OrderDetailActionTypes.ORDER_DETAIL_REQUEST_START:
        state.loading = true;
        return state;
      case OrderDetailActionTypes.ORDER_DETAIL_REQUEST_SUCCESS:
        state.loading = false;
        state.orderDetail = action.payload;
        return state;
      case OrderDetailActionTypes.ORDER_DETAIL_REQUEST_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
