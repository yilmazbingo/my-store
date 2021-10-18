import { UserRegisterActionTypes } from "./action.types";
import {
  IUserRegisterStartAction,
  IUserRegisterFailureAction,
  IUserRegisterSuccessAction,
  RegisterCredentials,
} from "./types";

export const userRegisterStart = (
  data: RegisterCredentials
): IUserRegisterStartAction => ({
  type: UserRegisterActionTypes.USER_REGISTER_START,
  payload: data,
});

export const userRegisterSuccess = (
  response: boolean
): IUserRegisterSuccessAction => ({
  type: UserRegisterActionTypes.USER_REGISTER_SUCCESS,
  payload: response,
});

export const userRegisterFailure = (
  error: any
): IUserRegisterFailureAction => ({
  type: UserRegisterActionTypes.USER_REGISTER_FAILURE,
  payload: error,
});
