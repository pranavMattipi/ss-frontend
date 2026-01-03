import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [jewellery, setJewellery] = useState([]);
  const [dresses, setDresses] = useState([]);
  const [filter, setFilter] = useState("all"); // all | jewellery | dresses

  useEffect(() => {
    axios
      .get("https://ss-backend-sage.vercel.app/api/jewellery")
      .then((res) => {
        const sorted = sortLatestFirst(res.data);
        setJewellery(sorted);
      })
      .catch((err) => console.error("Jewellery fetch error:", err));

    axios
      .get("https://ss-backend-sage.vercel.app/api/dresses")
      .then((res) => {
        const sorted = sortLatestFirst(res.data);
        setDresses(sorted);
      })
      .catch((err) => console.error("Dresses fetch error:", err));
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

  return (
    <div className="w-full px-6 py-10">
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
          {renderProducts(jewellery, "jewellery")}
        </div>
      )}

      {/* DRESSES */}
      {(filter === "all" || filter === "dresses") && (
        <div>
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">
            Dresses
          </h2>
          {renderProducts(dresses, "dresses")}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
