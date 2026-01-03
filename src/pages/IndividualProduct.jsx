import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

const IndividualProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState(null);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [jewellery, setJewellery] = useState([]);
  const [dresses, setDresses] = useState([]);

  // Determine type from path
  const isJewellery = location.pathname.startsWith("/jewellery");
  const type = isJewellery ? "jewellery" : "dresses";

  useEffect(() => {
    axios
      .get(`https://ss-backend-sage.vercel.app/api/${type}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id, type]);

  // Fetch all jewellery and dresses for recommendations
  useEffect(() => {
    axios.get("https://ss-backend-sage.vercel.app/api/jewellery").then(res => setJewellery(res.data)).catch(() => {});
    axios.get("https://ss-backend-sage.vercel.app/api/dresses").then(res => setDresses(res.data)).catch(() => {});
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : ["https://via.placeholder.com/256?text=No+Image"];
  const selectedImg = images[selectedImgIdx] || images[0];

  const firstImg = images[0];
  // Remove http/https from the link for WhatsApp message
  const imgText = firstImg.replace(/^https?:\/\//, "");
  const whatsappLink = `https://wa.me/9326943081?text=${encodeURIComponent(
    `Hi, I am interested in the product ${product.name} (ID: ${product._id}) priced at ₹${product.price}.
Image: ${imgText}`
  )}`;

  // Inline YouMayAlsoLike component
  const YouMayAlsoLike = ({ title, products, type }) => {
    const scrollRef = React.useRef(null);
    if (!products || products.length === 0) return null;

    const handleScroll = (dir) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: dir === "right" ? 350 : -350,
          behavior: "smooth",
        });
      }
    };

    // Show 'View All' card after 7 products if there are more than 7
    const showViewAll = products.length > 7;
    const visibleProducts = showViewAll ? products.slice(0, 7) : products;
    const allLink = type === "jewellery" ? "/allproducts?tab=jewellery" : "/allproducts?tab=dresses";

    // Scroll to top on product click
    const handleProductClick = (e, to) => {
      e.preventDefault();
      window.location.href = to;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div className="mb-10 w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3 ml-2">
          <h3 className="text-lg font-semibold text-yellow-900 ">{title}</h3>
        </div>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" fill="currentColor"><path d="M13 17l-5-5 5-5"/></svg>
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 px-12 scrollbar-hide"
            style={{ width: '100%', minWidth: 0 }}
          >
            {visibleProducts.map((item) => {
              const imageUrl = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/200?text=No+Image";
              const to = type === "jewellery" ? `/jewellery/${item._id}` : `/dresses/${item._id}`;
              return (
                <a
                  href={to}
                  key={item._id}
                  className="min-w-[180px] bg-white rounded-lg shadow p-3 hover:shadow-lg transition shrink-0 cursor-pointer flex flex-col items-center"
                  onClick={e => handleProductClick(e, to)}
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded mb-2"
                  />
                  <div className="font-medium text-gray-800 text-base truncate w-full text-center">{item.name}</div>
                  <div className="text-yellow-900 font-bold text-base">₹{item.price}</div>
                </a>
              );
            })}
            {showViewAll && (
              <a
                href={allLink}
                className="min-w-[180px] h-[232px] flex flex-col items-center justify-center border-2 border-dashed border-[#670E33] rounded-lg text-[#670E33] font-semibold hover:cursor-pointer hover:text-[20px] transition"
              >
                View All →
              </a>
            )}
          </div>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" fill="currentColor"><path d="M7 7l5 5-5 5"/></svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link to={isJewellery ? "/jewellery" : "/allproducts"} className="text-yellow-900 hover:underline">← Back</Link>
      <div className="bg-white rounded-lg shadow p-6 mt-4 flex flex-col items-center">
        {/* Large selected image */}
        <img
          src={selectedImg}
          alt={product.name}
          className="w-80 h-80 object-cover rounded mb-4 shadow-2xl cursor-pointer hover:scale-105 transition"
          onClick={() => setModalImg(selectedImg)}
        />
        {/* Thumbnails for selection */}
        <div className="flex gap-3 mb-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={product.name}
              className={`w-20 h-20 object-cover rounded shadow-lg cursor-pointer transition ${selectedImgIdx === idx ? 'ring-2 ring-yellow-900' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setSelectedImgIdx(idx)}
            />
          ))}
        </div>
        {/* Modal for enlarged image */}
        {modalImg && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={modalImg}
                alt="Enlarged"
                className="max-w-[90vw] max-h-[80vh] rounded shadow-1xl"
              />
              <button
                onClick={() => setModalImg(null)}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-60 rounded-full p-2 text-2xl hover:bg-opacity-90"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <h1 className="text-2xl font-bold text-yellow-900 mb-2">{product.name}</h1>
        <div className="text-gray-500 text-center mb-2">{product.description}</div>
        <div className="text-yellow-900 font-bold text-xl mb-4">₹{product.price}</div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
        >
          Order on WhatsApp
        </a>
      </div>
      {/* You may also like sections */}
      <div className="mt-10">
        <YouMayAlsoLike
          title="You may also like - Jewellery"
          products={jewellery.filter(j => j._id !== id)}
          type="jewellery"
        />
        <YouMayAlsoLike
          title="You may also like - Dresses"
          products={dresses.filter(d => d._id !== id)}
          type="dresses"
        />
      </div>
    </div>
  );
};

export default IndividualProduct;
