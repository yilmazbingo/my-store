import { UserListTypes } from "./action.types";
import {
  UserListSuccessAction,
  UserListResetAction,
  UserListFailureAction,
  UserListRequestAction,
  UserDeleteStart,
  UserDeleteSuccess,
  UserDeleteFailure,
} from "./types";

export const userListStart = (): UserListRequestAction => ({
  type: UserListTypes.USER_LIST_REQUEST_START,
});

export const userListSuccess = (data: any): UserListSuccessAction => ({
  type: UserListTypes.USER_LIST_SUCCESS,
  payload: data,
});

export const userListFailure = (error: any): UserListFailureAction => ({
  type: UserListTypes.USER_LIST_FAILURE,
  payload: error,
});

export const userListReset = (): UserListResetAction => ({
  type: UserListTypes.USER_LIST_RESET,
});

export const userDeleteStart = (id: string): UserDeleteStart => ({
  type: UserListTypes.USER_DELETE_REQUEST_START,
  payload: id,
});

export const userDeleteSuccess = (id: string): UserDeleteSuccess => ({
  type: UserListTypes.USER_DELETE_SUCCESS,
  payload: id,
});

export const userDeleteFailure = (error: any): UserDeleteFailure => ({
  type: UserListTypes.USER_DELETE_FAILURE,
  payload: error,
});
