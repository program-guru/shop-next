import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
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
				<Sun
					className="w-5 h-5 text-yellow-500 transition-transform rotate-0 hover:rotate-90 focus:outline-none focus:ring-0 border-0"
					style={{
						backgroundColor: "var(--color-surface)",
						color: "var(--color-text)",
					}}
				/>
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
}
