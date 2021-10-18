import { IUser } from "@/types/interfaces";
import { UserUpdateActionTypes } from "./action.types";

export interface IUserUpdateState {
  error: any;
  loading: boolean;
  user: IUser | {};
}

export interface IUserUpdateData {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}
export interface IUserUpdateRequestStart {
  type: UserUpdateActionTypes.USER_UPDATE_REQUEST_START;
  payload: IUserUpdateData;
}

export interface IUserUpdateSuccess {
  type: UserUpdateActionTypes.USER_UPDATE_SUCCESS;
  payload: IUser;
}

export interface IUserUpdateFailure {
  type: UserUpdateActionTypes.USER_UPDATE_FAILURE;
  payload: any;
}
export interface IUserUpdateReset {
  type: UserUpdateActionTypes.USER_UPDATE_RESET;
}

export type Action =
  | IUserUpdateFailure
  | IUserUpdateRequestStart
  | IUserUpdateReset
  | IUserUpdateSuccess;
