import produce from "immer";
import { AdminOrderListTypes } from "./action.types";
import { Action } from "./types";

const initialState = {
  error: null,
  orders: [],
  loading: false,
};

export const adminOrderListReducer = produce(
  (state = initialState, action: Action) => {
    switch (action.type) {
      case AdminOrderListTypes.ADMIN_ORDER_LIST_REQUEST_START:
      case AdminOrderListTypes.ORDER_DELIVER_REQUEST_START:
        state.loading = true;
        return state;
      case AdminOrderListTypes.ADMIN_ORDER_LIST_SUCCESS:
        state.loading = false;
        state.orders = action.payload;
        return state;
      case AdminOrderListTypes.ORDER_DELIVER_SUCCESS:
        const index = state.products.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) state.orders[index] = action.payload;
        return state;
      case AdminOrderListTypes.ADMIN_ORDER_LIST_FAILURE:
      case AdminOrderListTypes.ORDER_DELIVER_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;

      default:
        return state;
    }
  }
);
