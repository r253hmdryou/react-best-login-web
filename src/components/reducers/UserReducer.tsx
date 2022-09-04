import { Login } from "@/api";
import React from "react";

export type User = {
	id: string,
	email: string,
}
/**
 * User: if authorized, contains user data
 * if not authorized, to be false
 * if not authorize yet, to be null
 */
export type UserState = User | false | null;
export type UserAction = {
	type: "loginSuccess",
	payload: Login.Login.ResponseBody,
} | {
	type: "failedToLogin",
} | {
	type: "logout",
};

export const userInitialState = null;

const userReducer: React.Reducer<UserState, UserAction> = (_state, action): UserState => {
	switch(action.type){
	case "loginSuccess":
		return {
			...action.payload,
		};
	case "failedToLogin":
		return false;
	case "logout":
		return null;
	}
};

export const useUserReducer = () => {
	return React.useReducer(userReducer, userInitialState);
};
