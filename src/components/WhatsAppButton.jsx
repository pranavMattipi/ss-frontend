import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhatsAppButton = () => {
  return (
    <Link
      to="https://wa.me/9326943081?text=Hi%20I%20am%20interested%20in%20your%20products"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} />
      <span className="font-semibold text-sm md:text-base">
        Order Now
      </span>
    </Link>
  );
};

export default WhatsAppButton;
