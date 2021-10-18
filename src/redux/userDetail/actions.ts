import { IUser } from "@/types/interfaces";
import { UserDetailTypes } from "./action.types";
import {
  IUserDetailRequestStart,
  IUserDetailRequestSuccess,
  IUserDetailRequestFailure,
} from "./types";

export const userDetailRequestStart = (
  id: string
): IUserDetailRequestStart => ({
  type: UserDetailTypes.USER_DETAILS_START,
  payload: id,
});

export const userDetailRequestSuccess = (
  userDetail: IUser
): IUserDetailRequestSuccess => ({
  type: UserDetailTypes.USER_DETAILS_SUCCESS,
  payload: userDetail,
});

export const userDetailRequestFailure = (
  error: any
): IUserDetailRequestFailure => ({
  type: UserDetailTypes.USER_DETAILS_FAILURE,
  payload: error,
});
