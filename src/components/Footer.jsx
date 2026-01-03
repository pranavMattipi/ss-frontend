import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-gray-300"
    style={{ backgroundColor: "#670E33" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BRAND / DESCRIPTION */}
        <div className="space-y-3">
          <h2 
            className="text-4xl font-extrabold text-yellow-500 hover:text-yellow-300 transition"
            style={{ fontFamily: "'Playball', cursive" }}
          >
            Sandhya Silks
          </h2>
          <p className="text-sm leading-relaxed">
            Sandhya Silks brings you timeless elegance with premium quality
            sarees, lehengas, and traditional wear crafted to celebrate every
            special moment.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/allproducts" className="hover:text-white transition">
                Collection
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>

            <li>
              <a
                href="https://wa.me/9326943081?text=Hi%20I%20am%20interested%20in%20your%20products"
                className="hover:text-white transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <Link
              to="https://www.facebook.com/"
              className="p-3 bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-white transition"
            >
              <FaFacebookF />
            </Link>

            <Link
              to="https://www.instagram.com/"
              className="p-3 bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-white transition"
            >
              <FaInstagram />
            </Link>

            <Link
              to="https://www.twittwr.com/"
              className="p-3 bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-white transition"
            >
              <FaTwitter />
            </Link>

            <Link
              to="https://www.youtube.com/"
              className="p-3 bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-white transition"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} Sandhya Silks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
