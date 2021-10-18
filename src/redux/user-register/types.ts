import { IUser } from "@/types/interfaces";
import { UserRegisterActionTypes } from "./action.types";

export interface IUserRegisterState {
  success: boolean;
  loading: boolean;
  error: any;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface IUserRegisterStartAction {
  type: UserRegisterActionTypes.USER_REGISTER_START;
  payload: RegisterCredentials;
}

export interface IUserRegisterSuccessAction {
  type: UserRegisterActionTypes.USER_REGISTER_SUCCESS;
  payload: boolean;
}

export interface IUserRegisterFailureAction {
  type: UserRegisterActionTypes.USER_REGISTER_FAILURE;
  payload: any;
}

export type Action =
  | IUserRegisterStartAction
  | IUserRegisterFailureAction
  | IUserRegisterSuccessAction;
