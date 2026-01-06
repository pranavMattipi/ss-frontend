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

  // ✅ FIX: scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch individual product
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ss-backend-sage.vercel.app/api/${type}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImgIdx(0);
        setLoading(false);
      })
      .catch(() => {
        setError("Product not found");
        setLoading(false);
      });
  }, [id, type]);

  // Fetch recommendations
  useEffect(() => {
    axios
      .get("https://ss-backend-sage.vercel.app/api/jewellery")
      .then((res) => setJewellery(res.data))
      .catch(() => {});

    axios
      .get("https://ss-backend-sage.vercel.app/api/dresses")
      .then((res) => setDresses(res.data))
      .catch(() => {});
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/256?text=No+Image"];

  const selectedImg = images[selectedImgIdx] || images[0];

  const firstImg = images[0];
  const imgText = firstImg.replace(/^https?:\/\//, "");

  const whatsappLink = `https://wa.me/9326943081?text=${encodeURIComponent(
    `Hi, I am interested in the product ${product.name} (ID: ${product._id}) priced at ₹${product.price}.
Image: ${imgText}`
  )}`;

  // ---------- YOU MAY ALSO LIKE ----------
  const YouMayAlsoLike = ({ title, products, type }) => {
    const scrollRef = React.useRef(null);
    if (!products || products.length === 0) return null;

    const handleScroll = (dir) => {
      scrollRef.current?.scrollBy({
        left: dir === "right" ? 350 : -350,
        behavior: "smooth",
      });
    };

    const showViewAll = products.length > 7;
    const visibleProducts = showViewAll ? products.slice(0, 7) : products;
    const allLink =
      type === "jewellery"
        ? "/allproducts?tab=jewellery"
        : "/allproducts?tab=dresses";

    return (
      <div className="mb-10 w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3 ml-2">
          <h3 className="text-lg font-semibold text-yellow-900">{title}</h3>
        </div>

        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            onClick={() => handleScroll("left")}
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 px-12 scrollbar-hide"
          >
            {visibleProducts.map((item) => {
              const imageUrl =
                item.images?.[0] ||
                "https://via.placeholder.com/200?text=No+Image";

              const to =
                type === "jewellery"
                  ? `/jewellery/${item._id}`
                  : `/dresses/${item._id}`;

              return (
                <a
                  key={item._id}
                  href={to}
                  className="min-w-[180px] bg-white rounded-lg shadow p-3 hover:shadow-lg transition shrink-0 flex flex-col items-center"
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded mb-2"
                  />
                  <div className="font-medium text-center truncate w-full">
                    {item.name}
                  </div>
                  <div className="text-yellow-900 font-bold">
                    ₹{item.price}
                  </div>
                </a>
              );
            })}

            {showViewAll && (
              <a
                href={allLink}
                className="min-w-[180px] h-[232px] flex items-center justify-center border-2 border-dashed border-[#670E33] rounded-lg font-semibold"
              >
                View All →
              </a>
            )}
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            onClick={() => handleScroll("right")}
          >
            ›
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8E7]">
      <div className="max-w-2xl mx-auto p-6">
        <Link to="/allproducts" className="text-yellow-900 hover:underline">
          ← Back
        </Link>

        <div className="bg-white rounded-lg shadow p-6 mt-4 flex flex-col items-center">
          {/* MAIN IMAGE (ZOOM ENABLED) */}
          <img
            src={selectedImg}
            alt={product.name}
            className="w-80 h-80 object-cover rounded mb-4 shadow-2xl cursor-pointer hover:scale-105 transition"
            onClick={() => setModalImg(selectedImg)}
          />

          {/* THUMBNAILS */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4 w-full max-w-xs">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name}
                className={`w-20 h-20 object-cover rounded shadow-lg cursor-pointer transition ${
                  selectedImgIdx === idx
                    ? "ring-2 ring-yellow-900"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImgIdx(idx)}
              />
            ))}
          </div>

          {/* ZOOM MODAL */}
          {modalImg && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative">
                <img
                  src={modalImg}
                  alt="Enlarged"
                  className="max-w-[90vw] max-h-[80vh] rounded shadow-2xl"
                />
                <button
                  onClick={() => setModalImg(null)}
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-60 rounded-full p-2 text-2xl hover:bg-opacity-90"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-yellow-900 mb-2">
            {product.name}
          </h1>
          <div className="text-gray-500 text-center mb-2">
            {product.description}
          </div>
          <div className="text-yellow-900 font-bold text-xl mb-4">
            ₹{product.price}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
          >
            Order on WhatsApp
          </a>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-10">
          <YouMayAlsoLike
            title="You may also like - Jewellery"
            products={jewellery.filter((j) => j._id !== id)}
            type="jewellery"
          />
          <YouMayAlsoLike
            title="You may also like - Dresses"
            products={dresses.filter((d) => d._id !== id)}
            type="dresses"
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
