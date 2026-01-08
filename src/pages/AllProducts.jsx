import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [jewellery, setJewellery] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [filter, setFilter] = useState("all"); // all | jewellery | dresses
  const [loadingJewellery, setLoadingJewellery] = useState(true);
  const [loadingDresses, setLoadingDresses] = useState(true);

  useEffect(() => {
    axios
      .get("https://ss-backend-sage.vercel.app/api/jewellery")
      .then((res) => {
        const sorted = sortLatestFirst(res.data);
        setJewellery(sorted);
        setLoadingJewellery(false);
      })
      .catch((err) => {console.error("Jewellery fetch error:", err); setLoadingJewellery(false);});

    axios
      .get("https://ss-backend-sage.vercel.app/api/dresses")
      .then((res) => {
        const sorted = sortLatestFirst(res.data);
        setDresses(sorted);
        setLoadingDresses(false);
      })
      .catch((err) => {console.error("Dresses fetch error:", err); setLoadingDresses(false);});
  }, []);

  // ✅ Sort newest → oldest
  const sortLatestFirst = (items) => {
    return [...items].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // fallback for MongoDB ObjectId
      return b._id?.localeCompare(a._id);
    });
  };

  const renderProducts = (items, type) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => {
        let imageUrl = "https://via.placeholder.com/300?text=No+Image";
        if (Array.isArray(item.images) && item.images.length > 0) {
          imageUrl = item.images[0].startsWith('http')
            ? item.images[0]
            : `https://ss-backend-sage.vercel.app/${item.images[0].replace(/^\/+/,'')}`;
        }
        return (
          <Link
            to={
              type === "jewellery" ? `/jewellery/${item._id}` : `/dresses/${item._id}`
            }
            key={item._id || idx}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition block"
          >
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-56 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {item.description}
            </p>
            <div className="text-yellow-900 font-bold mt-2">
              ₹{item.price}
            </div>
          </Link>
        );
      })}
    </div>
  );

  const Spinner = () => (
    <div className="flex items-center justify-center w-full h-48">
      <svg className="animate-spin h-10 w-10 text-[#670E33]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
    </div>
  );

  return (
    <div className="w-full px-6 py-10 min-h-screen" style={{ backgroundColor: '#FFF8E7' }}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-yellow-900">
          All Products 
        </h1>

        {/* FILTER */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-yellow-900 rounded px-4 py-2 text-sm focus:outline-none"
        >
          <option value="all">All</option>
          <option value="jewellery">Jewellery</option>
          <option value="dresses">Dresses</option>
        </select>
      </div>

      {/* JEWELLERY */}
      {(filter === "all" || filter === "jewellery") && (
        <div className="mb-14">
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">
            Jewelleries
          </h2>
          {loadingJewellery ? <Spinner /> : renderProducts(jewellery, "jewellery")}
        </div>
      )}

      {/* DRESSES */}
      {(filter === "all" || filter === "dresses") && (
        <div>
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">
            Dresses
          </h2>
          {loadingDresses ? <Spinner /> : renderProducts(dresses, "dresses")}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
