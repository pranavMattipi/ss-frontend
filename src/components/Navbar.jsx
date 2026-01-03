import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center px-10 py-6 shadow-md"
      style={{ backgroundColor: "#670E33" }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{ fontFamily: "'Playball', cursive" }}
        className="text-4xl font-extrabold text-yellow-500 hover:text-yellow-300 transition"
      >
        Sandhya Silks
      </Link>

      {/* NAV LINKS */}
      <div className="flex gap-8">
        <Link
          to="/allproducts"
          className="text-white font-bold hover:text-yellow-300 transition"
        >
          Dresses and Jewellery
        </Link>

        <Link
          to="https://wa.me/9326943081?text=Hi%20I%20am%20interested%20in%20your%20products"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-bold hover:text-yellow-300 transition"
        >
          Chat
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
