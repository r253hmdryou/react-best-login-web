import React from "react";
import { Theme, ThemeProvider } from "@emotion/react";

import { Api } from "@/api";

import { lightTheme } from "@/themes/light";
import { standardTypographyTheme } from "@/themes/common";

import { UserAction, userInitialState, UserState, useUserReducer } from "@/components/reducers/UserReducer";

type Props = {
	children: React.ReactNode;
}

export function Context({children}: Props) {

	return (
		<ThemeContext>
			{children}
		</ThemeContext>
	);
}

function ThemeContext({children}: Props) {
	const defaultColor = lightTheme;
	const defaultTypography = standardTypographyTheme;
	const defaultTheme = {
		color: defaultColor,
		typography: defaultTypography,
	};

	const [theme, _setTheme] = React.useState<Theme>(defaultTheme);
	return (
		<ThemeProvider theme={theme}>
			<UserContextWrapper>
				{children}
			</UserContextWrapper>
		</ThemeProvider>
	);
}

export const UserStateContext = React.createContext<UserState>(userInitialState);
export const UserDispatchContext = React.createContext<React.Dispatch<UserAction>>(() => {});

function UserContextWrapper({children}: Props) {

	const [userState, userDispatch] = useUserReducer();

	React.useEffect(() => {
		if(userState === null) {
			const api = new Api;
			api.users.getMyUser({
				credentials: "include",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			}).then((response) => {
				console.log(response);
				userDispatch({
					type: "loginSuccess",
					payload: response.data,
				});
			}).catch((error) => {
				switch(error.status) {
				case 401:
					userDispatch({
						type: "failedToLogin",
					});
				}
			});
		}
	}, [userState]);

	if(userState === null) {
		return (
			<div>Loading...</div>
		);
	}

	return (
		<UserStateContext.Provider value={userState}>
			<UserDispatchContext.Provider value={userDispatch}>
				{children}
			</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	);
}
