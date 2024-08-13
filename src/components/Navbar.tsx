import React, { useContext, useState } from "react";
import { NavItems } from "../data";
import { X, Menu } from "lucide-react";
import AuthContext from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-tight">LOGO</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {NavItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center relative">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="py-2 px-3 rounded-md">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user?.role}`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 border border-neutral-700/80 rounded-md shadow-lg">
                    <ul>
                      <li className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer">
                        <a href="/settings" className="text-black">Configuración</a>
                      </li>
                      <li
                        onClick={logout}
                        className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer text-black"
                      >
                        Cerrar sesión
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="bg-gradient-to-r from-green-500 to-green-800 py-2 px-3 rounded-md"
              >
                Login
              </a>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className='"fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden'>
            <ul>
              {NavItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              {isAuthenticated ? (
                <button onClick={logout} className="py-2 px-3 rounded-md">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user?.role}`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
              ) : (
                <a
                  href="/login"
                  className="py-2 px-3 border rounded-md bg-gradient-to-r from-green-500 to-green-800"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;