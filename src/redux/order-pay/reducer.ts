import produce from "immer";
import { OrderPayActionTypes } from "./action.types";
import { IAction, IOrderPayState } from "./types";

const initialState = {
  loading: false,
  orderPaid: null,
  error: null,
};

export const orderPayReducer = produce(
  (state: IOrderPayState = initialState, action: IAction) => {
    switch (action.type) {
      case OrderPayActionTypes.ORDER_PAY_REQUEST_START:
        state.loading = true;
        return state;
      case OrderPayActionTypes.ORDER_PAY_REQUEST_START:
        state.orderPaid = action.payload;
        state.loading = false;
        return state;
      case OrderPayActionTypes.ORDER_PAY_FAILURE:
        state.error = action.payload;
        state.loading = false;
        return state;
      default:
        return state;
    }
  }
);
