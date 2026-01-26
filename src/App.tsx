import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import ThemeProvider from "./context/ThemeProvider";
import Products from "./pages/Products";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route
								path="/products"
								element={<Products />}
							/>
							<Route
								path="/products/:id"
								element={<ProductDetails />}
							/>
							<Route path="/about" element={<AboutUs />} />
							<Route
								path="/contact"
								element={<ContactUs />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}
