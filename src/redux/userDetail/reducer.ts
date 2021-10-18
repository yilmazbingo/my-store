import { IUser } from "@/types/interfaces";
import produce from "immer";
import { UserDetailTypes } from "./action.types";
import { Action } from "./types";

interface UserDetail {
  loading: boolean;
  user: IUser | null;
  error: any;
}

const initialState = {
  user: null,
  error: false,
  loading: false,
};

export const userDetailReducer = produce(
  (state: UserDetail = initialState, action: Action) => {
    switch (action.type) {
      case UserDetailTypes.USER_DETAILS_SUCCESS:
        state.user = action.payload;
        return state;
      case UserDetailTypes.USER_DETAILS_FAILURE:
        state.error = action.payload;
        return state;
      default:
        return state;
    }
  }
);
