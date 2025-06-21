import React, { useState, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import LoginPopup from '../LoginPopup/LoginPopup';
import { AuthContext } from '../../context/AuthContext';  
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); 
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');  
  };

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.41 10.3847C1.14777 7.4194..."
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li><Link className="text-gray-500 transition hover:text-gray-500/75" to="/">Add Lists</Link></li>
                  <li><Link className="text-gray-500 transition hover:text-gray-500/75" to="/view">View Lists</Link></li>
                  <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Contact</a></li>
                  <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Blog</a></li>
                </ul>
              </nav>

              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-2xl text-teal-600" />
                  <button
                    onClick={handleLogout}
                    className="rounded-md cursor-pointer bg-red-100 px-4 py-2 text-sm font-medium text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="rounded-md cursor-pointer bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setShowLogin(true)}
                    className="cursor-pointer hidden sm:inline rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </>
  );
};

export default Navbar;
