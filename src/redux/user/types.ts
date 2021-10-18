// import { IUserLoginFailure } from "./types";
import { IUser } from "@/types/interfaces";
import { UserActionTypes } from "./user.types";
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateCredentials {
  name: string;
  email: string;
  password: string;
  id: number;
}

export interface IUserLoginStart {
  type: UserActionTypes.USER_LOGIN_START;
  payload: LoginCredentials;
}

export interface IUserLoginSuccess {
  type: UserActionTypes.USER_LOGIN_SUCESS;
  payload: IUser;
}

export interface IUserLoginFailure {
  type: UserActionTypes.USER_LOGIN_FAILURE;
  payload: any;
}

export interface IUserLogoutStart {
  type: UserActionTypes.USER_LOGOUT_START;
}

export interface IUserLogoutSuccess {
  type: UserActionTypes.USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailure {
  type: UserActionTypes.USER_LOGOUT_FAILURE;
  payload: any;
}

export interface IUserProfileUpdateStart {
  type: UserActionTypes.USER_UPDATE_REQUEST_START;
  payload: UpdateCredentials;
}

export interface IUserProfileUpdateSuccess {
  type: UserActionTypes.USER_UPDATE_SUCCESS;
  payload: IUser;
}

export interface IUserProfileUpdateFailure {
  type: UserActionTypes.USER_UPDATE_FAILURE;
  payload: any;
}
export interface Hydrate {
  type: UserActionTypes.HYDRATE;
}

export type Action =
  | IUserLoginStart
  | IUserLoginSuccess
  | IUserLoginFailure
  | IUserLogoutStart
  | IUserLogoutSuccess
  | IUserLogoutFailure
  | IUserProfileUpdateStart
  | IUserProfileUpdateSuccess
  | IUserProfileUpdateFailure
  | Hydrate;
