import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", href: "#" },
        { name: "Products", href: "#" },
        { name: "About Us", href: "#" },
        { name: "Contact Us", href: "#" },
    ];

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className="flex items-center justify-between px-6 mt-3 py-3 md:py-4 shadow max-w-5xl rounded-full mx-auto w-full bg-surface text-text">
            <a href="https://prebuiltui.com">
                <img
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiDummyLogo.svg"
                    alt="ShopNext Logo"
                />
            </a>
            <nav
                id="menu"
                className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full transition-[width] bg-surface/50 backdrop-blur flex-col md:flex-row flex gap-8 text-text text-sm font-normal z-50 ${
                    isMenuOpen ? 'max-md:w-full' : 'max-md:w-0'
                }`}
            >
                <button id="closeMenu" className="md:hidden absolute top-6 right-6 text-text-muted" onClick={toggleMenu}>
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
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="hover:text-primary"
                        onClick={toggleMenu}
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
            <div className="flex items-center space-x-4 z-40"> 
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