import React from "react";
import {createRoot} from "react-dom/client";
import { App } from "@/App";
import { Context } from "./Context";

const element = document.getElementById("root");
if(element === null) {
	throw new Error("Root element not found");
}
const root = createRoot(element);
root.render(
	<React.StrictMode>
		<Context>
			<App />
		</Context>
	</React.StrictMode>,
);
