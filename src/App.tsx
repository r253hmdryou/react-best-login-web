import React from "react";
import { Theme, ThemeProvider } from "@emotion/react";
import "normalize.css";

import { Router } from "@/Router";
import { lightTheme } from "./themes/light";
import { standardTypographyTheme } from "./themes/common";

export function App() {
	const defaultColor = lightTheme;
	const defaultTypography = standardTypographyTheme;
	const defaultTheme = {
		color: defaultColor,
		typography: defaultTypography,
	};

	const [theme, _setTheme] = React.useState<Theme>(defaultTheme);

	return (
		<ThemeProvider theme={theme}>
			<Router />
		</ThemeProvider>
	);
}
