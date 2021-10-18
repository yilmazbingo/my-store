import produce from "immer";
import { UserRegisterActionTypes } from "./action.types";
import { IUserRegisterState, Action } from "./types";

const defaultState = {
  success: false,
  loading: false,
  error: null,
};

export const userRegisterReducer = produce(
  (state: IUserRegisterState = defaultState, action: Action) => {
    switch (action.type) {
      case UserRegisterActionTypes.USER_REGISTER_START:
        state.loading = true;
        return state;
      case UserRegisterActionTypes.USER_REGISTER_SUCCESS:
        state.loading = false;
        state.success = action.payload;
        return state;
      case UserRegisterActionTypes.USER_REGISTER_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
