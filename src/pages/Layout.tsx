import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import NotificationContainer from "../components/NotificationContainer";

export default function Layout() {
	return (
		<div className="app-container min-h-screen flex flex-col">
			<NotificationContainer />

			<header className="sticky top-0 z-50">
				<Navbar />
			</header>

			<main className="grow m-5">
				<Outlet />
			</main>

			<footer>
				<Footer />
			</footer>
		</div>
	);
}
