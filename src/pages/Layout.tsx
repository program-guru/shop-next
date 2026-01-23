import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import ThemeProvider from "../context/ThemeProvider";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<div className="app-container min-h-screen flex flex-col">
				<header className="sticky top-0 z-50">
					<Navbar />
				</header>

				<main className="grow m-5">{children}</main>

				<footer>
					<Footer />
				</footer>
			</div>
		</ThemeProvider>
	);
}
