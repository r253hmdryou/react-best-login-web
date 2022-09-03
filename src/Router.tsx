import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "@/components/pages/Home";
import { About } from "@/components/pages/About";
import { Login } from "@/components/pages/Login";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
