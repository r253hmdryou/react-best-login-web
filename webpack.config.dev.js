const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/Index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "./app.js",
	},

	devtool: "source-map",

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "/src"),
		},
		extensions: [".ts", ".tsx", ".js"],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{loader: "ts-loader"},
				],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		open: false,
		port: 4000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/public/index.html",
		}),
	],
};
