import { UserDetailTypes } from "./actiontypes";

export const userDetailRequestStart = (id: number) => ({
  type: UserDetailTypes.USER_DETAILS_START,
  payload: id,
});

export const userDetailRequestSuccess = (userDetail) => ({
  type: UserDetailTypes.USER_DETAILS_SUCCESS,
  payload: userDetail,
});

export const userDetailRequestFailure = (error: any) => ({
  type: UserDetailTypes.USER_DETAILS_FAILURE,
  payload: error,
});
