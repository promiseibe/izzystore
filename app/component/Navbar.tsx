"use client";

import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full  fixed top-0 left-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex bg-[#001b1d] items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-orange-300 font-bold">Izzy All Hotel and Home Interior Amenity Ventu</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <button className="text-white hover:text-blue-500">Home</button>
          <button className="text-white hover:text-blue-500">Shop</button>
          <button className="text-white hover:text-blue-500">About Us</button>
          <button className="text-white hover:text-blue-500">Contact</button>
        </div>

        {/* Right Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 text-xl">
          <Search className="cursor-pointer text-white hover:text-blue-500" />
          <Heart className="cursor-pointer text-white hover:text-blue-500" />
          <ShoppingCart className="cursor-pointer text-white hover:text-blue-500" />
          <User className="cursor-pointer text-white hover:text-blue-500" />
        </div>

        {/* Mobile Section */}
        <div className="flex items-center space-x-3 md:hidden text-xl">
          
          {/* Icons OUTSIDE hamburger (your requirement) */}
          <Search className="cursor-pointer text-white" />
          <ShoppingCart className="cursor-pointer text-white" />
          <User className="cursor-pointer text-white" />

          {/* Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  shadow-lg px-4 pb-4 bg-[#011314]">
          <div className="flex flex-col space-y-3">
            
            {/* Links */}
            <button className="text-left text-white hover:text-blue-500">Home</button>
            <button className="text-left text-white hover:text-blue-500">Shop</button>
            <button className="text-left text-white hover:text-blue-500">About Us</button>
            <button className="text-left text-white hover:text-blue-500">Contact</button>

            {/* Divider */}
            <hr />

            {/* Heart INSIDE menu (your requirement) */}
            <div className="flex items-center space-x-2">
              <Heart className="text-white" />
              <span className="text-white">Favorites</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}