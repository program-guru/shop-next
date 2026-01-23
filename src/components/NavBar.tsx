import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className="flex items-center justify-between px-6 mt-3 py-3 md:py-4 shadow max-w-5xl rounded-full mx-auto w-full bg-surface text-text">
            <a href="https://prebuiltui.com">
                <img
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg"
                    alt="PrebuiltUI Logo"
                />
            </a>
            <nav
                id="menu"
                className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full transition-[width] bg-surface/50 backdrop-blur flex-col md:flex-row flex gap-8 text-text text-sm font-normal ${
                    isMenuOpen ? 'max-md:w-full' : 'max-md:w-0'
                }`}
            >
                <a className="hover:text-primary" href="#">
                    Products
                </a>
                <a className="hover:text-primary" href="#">
                    Customer Stories
                </a>
                <a className="hover:text-primary" href="#">
                    Pricing
                </a>
                <a className="hover:text-primary" href="#">
                    Docs
                </a>
                <button id="closeMenu" className="md:hidden text-text-muted" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </nav>
            <div className="flex items-center space-x-4">
                <ThemeToggle />
                <a
                    className="hidden md:flex bg-primary text-text-inverse px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition"
                    href="#"
                >
                    Sign up
                </a>
                <button id="openMenu" className="md:hidden text-text-muted" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}