import { IUser } from "@/types/interfaces";
import { UserDetailTypes } from "./action.types";

export interface IUserDetailRequestStart {
  type: UserDetailTypes.USER_DETAILS_START;
  payload: string;
}

export interface IUserDetailRequestSuccess {
  type: UserDetailTypes.USER_DETAILS_SUCCESS;
  payload: IUser;
}

export interface IUserDetailRequestFailure {
  type: UserDetailTypes.USER_DETAILS_FAILURE;
  payload: any;
}

export type Action =
  | IUserDetailRequestStart
  | IUserDetailRequestSuccess
  | IUserDetailRequestFailure;
