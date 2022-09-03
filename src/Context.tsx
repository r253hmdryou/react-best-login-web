import React from "react";
import { Theme, ThemeProvider } from "@emotion/react";

import { lightTheme } from "./themes/light";
import { standardTypographyTheme } from "./themes/common";

type Props = {
	children: React.ReactNode;
}

export function Context({children}: Props) {
	const defaultColor = lightTheme;
	const defaultTypography = standardTypographyTheme;
	const defaultTheme = {
		color: defaultColor,
		typography: defaultTypography,
	};

	const [theme, _setTheme] = React.useState<Theme>(defaultTheme);

	return (
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	);
}
