import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import ThemeProvider from "./context/ThemeProvider";

export default function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<AboutUs />} />
						<Route path="/contact" element={<ContactUs />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}
