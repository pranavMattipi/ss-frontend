import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full bg-white">
      {/* HERO SECTION */}
      <div className="bg-white text-[#670E33] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Sandhya Silks
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-[#670E33]">
          Celebrating tradition, elegance, and timeless craftsmanship.
        </p>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl font-bold text-[#670E33] mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sandhya Silks was founded with a vision to bring the richness of
            Indian tradition to modern wardrobes. Every piece we offer is a
            blend of heritage craftsmanship and contemporary elegance.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From luxurious silk sarees to beautifully designed jewellery and
            festive wear, our collections are curated to make every occasion
            special.
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-2xl font-bold text-[#670E33] mb-4">
            Our Promise
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li>✨ Premium quality fabrics and materials</li>
            <li>✨ Authentic designs with modern elegance</li>
            <li>✨ Handcrafted detailing and fine finishing</li>
            <li>✨ Customer-first service and satisfaction</li>
          </ul>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#670E33] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to preserve the beauty of traditional Indian attire
            while making it accessible to everyone. We aim to empower artisans,
            celebrate culture, and dress generations with grace and pride.
          </p>
        </div>
      </div>

      {/* VIEW ALL PRODUCTS */}
      <div className="py-14 flex justify-center">
        <Link
                            to="/allproducts"
                            className="px-8 py-3 border-2 bg-white  text-[#670E33] font-semibold rounded hover:bg-[#670E33] hover:text-white transition"
                          >
                            View All Products
                          </Link>
      </div>
    </div>
  );
};

export default About;
// No direct axios calls in About.jsx, so no changes needed unless you add API calls.
