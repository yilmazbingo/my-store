import produce from "immer";
import { UserUpdateActionTypes, Action } from "./action.types";
import { IUserUpdateState } from "./types";

const initialState = {
  loading: false,
  error: null,
  user: {},
};

export const userUpdateReducer = produce(
  (state: IUserUpdateState = initialState, action: Action) => {
    switch (action.type) {
      case UserUpdateActionTypes.USER_UPDATE_REQUEST_START:
        state.loading = true;
        return state;
      case UserUpdateActionTypes.USER_UPDATE_SUCCESS:
        state.user = action.payload;
        state.loading = false;
        return state;
      case UserUpdateActionTypes.USER_UPDATE_FAILURE:
        state.error = action.payload;
        state.loading = false;
      case UserUpdateActionTypes.USER_UPDATE_RESET:
        state.user = {};
        return state;
      default:
        return state;
    }
  }
);
