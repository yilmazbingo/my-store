import { IUser } from "@/types/interfaces";
import { UserUpdateActionTypes } from "./action.types";
import {
  IUserUpdateFailure,
  IUserUpdateRequestStart,
  IUserUpdateReset,
  IUserUpdateSuccess,
} from "./types";

export const userUpdateRequestStart = (
  id: string,
  name: string,
  isAdmin: boolean,
  email: string
): IUserUpdateRequestStart => ({
  type: UserUpdateActionTypes.USER_UPDATE_REQUEST_START,
  payload: { id, name, isAdmin, email },
});

export const userUpdateSuccess = (user: IUser): IUserUpdateSuccess => ({
  type: UserUpdateActionTypes.USER_UPDATE_SUCCESS,
  payload: user,
});

export const userUpdateFailure = (error: any): IUserUpdateFailure => ({
  type: UserUpdateActionTypes.USER_UPDATE_FAILURE,
  payload: error,
});

export const userUpdateReset = (): IUserUpdateReset => ({
  type: UserUpdateActionTypes.USER_UPDATE_RESET,
});
