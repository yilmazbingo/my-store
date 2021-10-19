import produce from "immer";
import { IUser } from "@/types/interfaces";
import { UserActionTypes } from "./user.types";
import { Action } from "./types";

interface UserState {
  loading: boolean;
  userInfo: IUser | null;
  error: any;
}

let userInfoFromStorage = null;
if (typeof window !== "undefined") {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null;
}
// state.userInfo = userInfo ? JSON.parse(userInfo) : null;
const initialState = {
  userInfo: userInfoFromStorage,
  error: null,
  loading: false,
};
// produce already returns state but If I do not return state implicitly I get ts warning
export const userLoginReducer = produce(
  (state: UserState = initialState, action: Action) => {
    switch (action.type) {
      case UserActionTypes.HYDRATE:
        let user = null;
        if (typeof window !== "undefined") {
          user = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo") as string)
            : null;
        }
        state.userInfo = user;
        return state;

      case UserActionTypes.USER_UPDATE_REQUEST_START:
      case UserActionTypes.USER_LOGIN_START:
        state.loading = true;
        return state;
      case UserActionTypes.USER_UPDATE_SUCCESS:
        state.userInfo = action.payload;
        state.loading = false;
        return state;
      case UserActionTypes.USER_UPDATE_SUCCESS:
      case UserActionTypes.USER_LOGIN_SUCESS:
        state.userInfo = action.payload;
        state.loading = false;
        return state;
      case UserActionTypes.USER_UPDATE_FAILURE:
      case UserActionTypes.USER_LOGIN_FAILURE:
        state.error = action.payload;
        state.loading = false;
        return state;
      case UserActionTypes.USER_LOGOUT_START:
        return state;
      // case UserActionTypes.USER_UPDATE_PROFILE_RESET:
      //   state = { loading: false, userInfo: null, error: null };
      //   return state;
      default:
        return state;
    }
  }
);
