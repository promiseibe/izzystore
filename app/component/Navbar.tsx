"use client";

import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full  fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-orange-200 font-bold">Izzy All Hotel and Home Interior Amenity Ventu</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <button className="hover:text-blue-500">Home</button>
          <button className="hover:text-blue-500">Shop</button>
          <button className="hover:text-blue-500">About Us</button>
          <button className="hover:text-blue-500">Contact</button>
        </div>

        {/* Right Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 text-xl">
          <FiSearch className="cursor-pointer" />
          <FiHeart className="cursor-pointer" />
          <FiShoppingCart className="cursor-pointer" />
          <FiUser className="cursor-pointer" />
        </div>

        {/* Mobile Section */}
        <div className="flex items-center space-x-3 md:hidden text-xl">
          
          {/* Icons OUTSIDE hamburger (your requirement) */}
          <FiSearch className="cursor-pointer" />
          <FiShoppingCart className="cursor-pointer" />
          <FiUser className="cursor-pointer" />

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  shadow-md px-4 pb-4">
          <div className="flex flex-col space-y-3">
            
            {/* Links */}
            <button className="text-left">Home</button>
            <button className="text-left">Shop</button>
            <button className="text-left">About Us</button>
            <button className="text-left">Contact</button>

            {/* Divider */}
            <hr />

            {/* Heart INSIDE menu (your requirement) */}
            <div className="flex items-center space-x-2">
              <FiHeart />
              <span>Favorites</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}