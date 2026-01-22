import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
	// Check Local Storage or System Preference on first load
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			// Check if user has a saved preference
			if (localStorage.getItem("theme")) {
				return localStorage.getItem("theme");
			}
			// If not, check their system/OS settings
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				return "dark";
			}
		}
		// Fallback default
		return "light";
	});

	//  Sync React State with the Local Storage
	useEffect(() => {
		const root = window.document.documentElement;

		if (theme === "dark") {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [theme]);

	// Toggle Handler
	function toggleTheme() {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	}

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-0 border-0"
			aria-label="Toggle Dark Mode"
			style={{
				backgroundColor: "var(--color-surface)",
				color: "var(--color-text)",
			}}
		>
			{theme === "dark" ? (
				<Sun className="w-5 h-5 text-yellow-500 transition-transform rotate-0 hover:rotate-90 focus:outline-none focus:ring-0 border-0" />
			) : (
				<Moon
					className="w-5 h-5 transition-transform hover:-rotate-12"
					style={{
						backgroundColor: "var(--color-surface)",
						color: "var(--color-text)",
					}}
				/>
			)}
		</button>
	);
};

export default ThemeToggle;
