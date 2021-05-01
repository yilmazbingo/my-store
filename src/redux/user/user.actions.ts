import { IUser } from "@/types/interfaces";
import { UserActionTypes } from "./user.types";
import * as types from "./types";

export const userLoginStart = (
  credentials: types.LoginCredentials
): types.IUserLoginStart => ({
  type: UserActionTypes.USER_LOGIN_START,
  payload: credentials,
});

export const userLoginSuccess = (user: IUser): types.IUserLoginSuccess => ({
  type: UserActionTypes.USER_LOGIN_SUCESS,
  payload: user,
});

export const userLoginFailure = (error: any): types.IUserLoginFailure => ({
  type: UserActionTypes.USER_LOGIN_FAILURE,
  payload: error,
});

export const userLogoutStart = (): types.IUserLogoutStart => ({
  type: UserActionTypes.USER_LOGOUT_START,
});

export const userLogoutSuccess = (): types.IUserLogoutSuccess => ({
  type: UserActionTypes.USER_LOGOUT_SUCCESS,
});

export const userLogoutFailure = (error: any): types.IUserLogoutFailure => ({
  type: UserActionTypes.USER_LOGOUT_FAILURE,
  payload: error,
});

export const userRegisterStart = (
  registerCredentials: types.RegisterCredentials
): types.IUserRegisterStart => ({
  type: UserActionTypes.USER_REGISTER_START,
  payload: registerCredentials,
});

export const userRegisterSuccess = (
  data: IUser
): types.IUserRegisterSuccess => ({
  type: UserActionTypes.USER_REGISTER_SUCCESS,
  payload: data,
});

export const userRegisterFailure = (
  error: any
): types.IUserRegisterFailure => ({
  type: UserActionTypes.USER_REGISTER_FAILURE,
  payload: error,
});

export const userProfileUpdateStart = (
  updateCredentials: types.UpdateCredentials
): types.IUserProfileUpdateStart => ({
  type: UserActionTypes.USER_UPDATE_REQUEST_START,
  payload: updateCredentials,
});

export const userProfileUpdateSuccess = (
  data: IUser
): types.IUserProfileUpdateSuccess => ({
  type: UserActionTypes.USER_UPDATE_SUCCESS,
  payload: data,
});

export const userProfileUpdateFailure = (
  error: any
): types.IUserProfileUpdateFailure => ({
  type: UserActionTypes.USER_UPDATE_FAILURE,
  payload: error,
});

export const hydrate = (): types.Hydrate => ({
  type: UserActionTypes.HYDRATE,
});

// export type Action =
//   | ReturnType<typeof userLoginStart>
//   | ReturnType<typeof userLoginSuccess>
//   | ReturnType<typeof userLoginFailure>
//   | ReturnType<typeof userLogoutStart>
//   | ReturnType<typeof userLogoutSuccess>
//   | ReturnType<typeof userLogoutFailure>
//   | ReturnType<typeof userRegisterStart>
//   | ReturnType<typeof userRegisterSuccess>
//   | ReturnType<typeof userRegisterFailure>
//   | ReturnType<typeof userProfileUpdateStart>
//   | ReturnType<typeof userProfileUpdateSuccess>
//   | ReturnType<typeof userProfileUpdateFailure>
//   | ReturnType<typeof hydrate>;
