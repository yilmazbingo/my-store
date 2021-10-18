import produce from "immer";
import { OrderCreateActionTypes } from "./action.types";
import { OrderState, Action } from "./types";

const initialState = {
  loading: false,
  error: null,
  order: null,
};

export const orderCreateReducer = produce(
  (state: OrderState = initialState, action: Action): OrderState => {
    switch (action.type) {
      case OrderCreateActionTypes.ORDER_CREATE_START:
        state.loading = true;
        return state;

      case OrderCreateActionTypes.ORDER_CREATE_SUCCESS:
        state.order = action.payload;
        return state;

      case OrderCreateActionTypes.ORDER_CREATE_FAILURE:
        state.error = action.payload;
        return state;

      case OrderCreateActionTypes.ORDER_CREATE_RESET:
        state = initialState;
        return state;

      default:
        return state;
    }
  }
);
