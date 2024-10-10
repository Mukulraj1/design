import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="text-black py-4 shadow-2xl bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="w-32">
          <NavLink to="/">
            <img src="./assets/logo.png" alt="Logo" className="w-full max-w-xs" />
          </NavLink>
          </div>
        <button
          onClick={toggleMenu}
          className="text-2xl lg-custom:hidden focus:outline-none"
          >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
        <nav className={`navbar w-full lg-custom:w-auto ${isMenuOpen ? 'block' : 'hidden'} lg-custom:block`}>
          <ul className="flex flex-col lg-custom:flex-row lg-custom:space-x-28 space-y-4 lg-custom:space-y-0">
            <li><NavLink to="/" className="hover:text-red-700">Products</NavLink></li>
            <li><NavLink to="/cap" className="hover:text-red-700">Cap</NavLink></li>
            <li><NavLink to="/buy" className="hover:text-red-700">Buy 1</NavLink></li>
            <li><NavLink to="/capcustomizer" className="hover:text-red-700">Cap-Design</NavLink></li>
            <li><NavLink to="/design" className="hover:text-red-700">Designs</NavLink></li>
            <li><NavLink to="/preview" className="hover:text-red-700">Preview</NavLink></li>
            <li><NavLink to="/account" className="hover:text-red-700">Account</NavLink></li>
            <li>
              <NavLink to="/cart" className="text-4xl">
                <FaCartPlus />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
