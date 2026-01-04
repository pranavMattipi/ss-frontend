import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import img1 from "../assets/pexels-ezra-166788-1281354.jpg";
import img2 from "../assets/pexels-vatsalmandavia-15026763.jpg";
import img3 from "../assets/pexels-vikashkr50-27155550.jpg";

const images = [img1, img2, img3];

const heroContent = [
  {
    title: "Timeless Elegance",
    subtitle: "Discover premium silks and handcrafted designs.",
  },
  {
    title: "Grace in Every Thread",
    subtitle: "Jewellery and dresses crafted for celebrations.",
  },
  {
    title: "Tradition Meets Luxury",
    subtitle: "Experience heritage fashion with modern charm.",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jewellery, setJewellery] = useState([]);
  const [dresses, setDresses] = useState([]);

  const jewelleryRef = useRef(null);
  const dressesRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://ss-backend-sage.vercel.app/api/jewellery")
      .then((res) => {
        setJewellery(sortLatest(res.data).slice(0, 6));
      })
      .catch((err) => console.error("Jewellery fetch error:", err));

    axios
      .get("https://ss-backend-sage.vercel.app/api/dresses")
      .then((res) => {
        setDresses(sortLatest(res.data).slice(0, 6));
      })
      .catch((err) => console.error("Error fetching dresses:", err));
  }, []);

  const sortLatest = (items) => {
    return [...items].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b._id?.localeCompare(a._id);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const scrollSection = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -220 : 220,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#FFF8E7' }}>
      {/* HERO */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Hero"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {heroContent[currentIndex].title}
            </h1>
            <p className="mb-6 max-w-xl mx-auto">
              {heroContent[currentIndex].subtitle}
            </p>
            <Link
                     to="/allproducts"
                     className="px-8 py-3 border-2 bg-white  text-[#670E33] font-semibold rounded hover:bg-[#670E33] hover:text-white transition"
                   >
                     View All Products
                   </Link>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-3 rounded-full"
        >
          ❯
        </button>
      </div>

      {/* JEWELLERY */}
      <ProductSection
        title="Latest Jewelleries"
        items={jewellery}
        refObj={jewelleryRef}
        scrollSection={scrollSection}
        type="jewellery"
      />

      {/* DRESSES */}
      <ProductSection
        title="Latest Dresses"
        items={dresses}
        refObj={dressesRef}
        scrollSection={scrollSection}
        type="dresses"
      />
    </div>
  );
};

const ProductSection = ({ title, items, refObj, scrollSection, type }) => {
  return (
    <div className="px-4 mt-14 "
    style={{ backgroundColor: '#FFF8E7' }}>
      <h2 className="text-lg font-bold text-[#670E33] mb-3">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scrollSection(refObj, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white text-[#670E33]"
        >
          ❮
        </button>

        <div
          ref={refObj}
          className="flex overflow-x-auto gap-6 pb-4 px-10"
        >
          {items.map((item, idx) => {
            let imageUrl = "https://via.placeholder.com/128";
            if (item.images && item.images[0]) {
              imageUrl = item.images[0].startsWith('http')
                ? item.images[0]
                : `https://ss-backend-sage.vercel.app/${item.images[0].replace(/^\/+/, '')}`;
            }
            return (
              <Link
                to={item._id ? `/${type}/${item._id}` : '#'}
                key={item._id || idx}
                className="min-w-56 bg-white rounded-lg shadow-xl p-4 flex flex-col items-center hover:shadow-2xl transition"
              >
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-48 h-48 object-cover rounded mb-2"
                />
                <div className="font-medium">{item.name}</div>
                <div className="text-[#670E33] font-bold">
                  ₹{item.price}
                </div>
              </Link>
            );
          })}

          {/* VIEW ALL CARD */}
          <Link
            to="/allproducts"
            className="min-w-56 flex items-center justify-center border-2 border-dashed border-[#670E33] rounded-lg text-[#670E33] font-semibold hover:cursor-pointer hover:text-[20px] transition"
          >
            View All →
          </Link>
        </div>

        <button
          onClick={() => scrollSection(refObj, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full  bg-white text-[#670E33]"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Home;
