import { UserListTypes } from "./action.types";
import { IUser } from "@/types/interfaces";

export interface UserListState {
  loading: boolean;
  userList: IUser[];
  error: any;
}

export interface UserListRequestAction {
  type: UserListTypes.USER_LIST_REQUEST_START;
}

export interface UserListSuccessAction {
  type: UserListTypes.USER_LIST_SUCCESS;
  payload: any;
}
export interface UserListFailureAction {
  type: UserListTypes.USER_LIST_FAILURE;
  payload: any;
}

export interface UserListResetAction {
  type: UserListTypes.USER_LIST_RESET;
}

export interface UserDeleteStart {
  type: UserListTypes.USER_DELETE_REQUEST_START;
  payload: string;
}

export interface UserDeleteSuccess {
  type: UserListTypes.USER_DELETE_SUCCESS;
  payload: string;
}

export interface UserDeleteFailure {
  type: UserListTypes.USER_DELETE_FAILURE;
  payload: any;
}
export type Action =
  | UserListFailureAction
  | UserListRequestAction
  | UserListResetAction
  | UserListSuccessAction
  | UserDeleteStart
  | UserDeleteSuccess
  | UserDeleteFailure;
