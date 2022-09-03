import "@emotion/react";

declare module "@emotion/react" {
	export interface Theme {
		color: ColorTheme;
		typography: TypographyTheme;
	}
}

export interface ColorTheme {
	primary: string
	secondary: string
	error: string
}

interface Typography {
	fontSize: string;
}

export interface TypographyTheme {
	fontSize: number;
	h1: Typography;
	h2: Typography;
	h3: Typography;
	h4: Typography;
	h5: Typography;
	h6: Typography;

}
