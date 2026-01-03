import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const YouMayAlsoLike = ({ title, products, type }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  if (!products || products.length === 0) return null;

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "right" ? 600 : -600,
        behavior: "smooth",
      });
    }
  };

  const showViewAll = products.length > 8;
  const visibleProducts = showViewAll ? products.slice(0, 8) : products;
  const allLink = type === "jewellery" ? "/allproducts?tab=jewellery" : "/allproducts?tab=dresses";

  // Scroll to top on product click
  const handleProductClick = (e, to) => {
    e.preventDefault();
    navigate(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3 ml-2">
        <h3 className="text-lg font-semibold text-yellow-900 ">{title}</h3>
      </div>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-4 px-20 scrollbar-hide"
          style={{ width: '100vw', minWidth: 0 }}
        >
          {visibleProducts.map((item) => {
            const imageUrl = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/200?text=No+Image";
            const to = type === "jewellery" ? `/jewellery/${item._id}` : `/dresses/${item._id}`;
            return (
              <a
                href={to}
                key={item._id}
                className="min-w-[240px] bg-white rounded-lg shadow p-3 hover:shadow-lg transition shrink-0 cursor-pointer flex flex-col items-center"
                onClick={e => handleProductClick(e, to)}
              >
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-52 h-52 object-cover rounded mb-2"
                />
                <div className="font-medium text-gray-800 text-base truncate w-full text-center">{item.name}</div>
                <div className="text-yellow-900 font-bold text-base">₹{item.price}</div>
              </a>
            );
          })}
          {showViewAll && (
            <Link
              to={allLink}
              className="min-w-[240px] h-[240px] flex flex-col items-center justify-center bg-yellow-100 rounded-lg shadow hover:bg-yellow-200 transition shrink-0 text-yellow-900 font-semibold text-lg border-2 border-yellow-900"
            >
              View All
            </Link>
          )}
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
