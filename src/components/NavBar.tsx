import { useState } from "react";
import { NavLink, Link } from "react-router";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAppSelector } from "../store/hooks";
import { selectCartTotalItems } from "../store/features/cart/cartSelectors";
import ThemeToggle from "./ThemeToggle";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  
  // Get live cart count from Redux
  const cartCount = useAppSelector(selectCartTotalItems);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="flex items-center justify-between px-6 mt-3 py-3 md:py-4 shadow-sm max-w-5xl rounded-full mx-auto w-full bg-surface text-text sticky top-3 z-50">
      <Link to="/" className="shrink-0">
        <img
          src={theme === "dark" ? logoDark : logoLight}
          className="h-8 md:h-10 w-auto"
          alt="ShopNext Logo"
        />
      </Link>

      {/* Mobile Navigation Overlay */}
      <nav
        id="menu"
        className={`
          max-md:fixed max-md:top-0 max-md:left-0 max-md:overflow-hidden 
          items-center justify-center max-md:h-full transition-[width] duration-300
          bg-surface/95 backdrop-blur-md flex-col md:flex-row flex gap-8 
          text-text text-sm font-normal z-50
          ${isMenuOpen ? "max-md:w-full" : "max-md:w-0"}
        `}
      >
        <button
          id="closeMenu"
          className="md:hidden absolute top-6 right-6 text-text-muted hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {links.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            onClick={() => setIsMenuOpen(false)} // Close menu on click
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 rounded-lg bg-primary text-text-inverse font-semibold"
                : "px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center space-x-3 md:space-x-4 z-40">
        <ThemeToggle />

        {/* Cart Icon with Badge */}
        <Link 
          to="/cart" 
          className="relative p-2 hover:bg-surface-hover rounded-full transition-colors group"
          aria-label="View cart"
        >
          <ShoppingCart className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
          
          {cartCount > 0 && (
            <span className="
              absolute -top-1 -right-1 
              bg-primary text-text-inverse 
              text-[10px] font-bold 
              h-5 w-5 flex items-center justify-center 
              rounded-full animate-in zoom-in shadow-sm
            ">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          id="openMenu"
          className="md:hidden text-text-muted hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}