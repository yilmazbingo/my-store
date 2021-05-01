import { produce } from "immer";
import { UserListTypes } from "./action.types";
import { Action, UserListState } from "./types";

const initialState: UserListState = {
  loading: false,
  userList: [],
  error: null,
};

export const userListReducer = produce(
  (state: UserListState = initialState, action: Action) => {
    switch (action.type) {
      case UserListTypes.USER_DELETE_REQUEST_START:
      case UserListTypes.USER_LIST_REQUEST_START:
        state.loading = true;
        return state;
      case UserListTypes.USER_LIST_SUCCESS:
        state.loading = false;
        state.userList = action.payload;
        return state;
      case UserListTypes.USER_DELETE_FAILURE:
      case UserListTypes.USER_LIST_FAILURE:
        state.loading = false;
        state.error = action.payload;
        return state;
      case UserListTypes.USER_LIST_RESET:
        state.userList = [];
        return state;
      case UserListTypes.USER_DELETE_SUCCESS:
        state.userList = state.userList.filter(
          (user) => user.id !== Number(action.payload)
        );
        state.loading = false;
        return state;
      default:
        return state;
    }
  }
);
