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

  // ✅ FIX: ALWAYS SCROLL TO TOP WHEN PRODUCT OPENS
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id, type]);

  useEffect(() => {
    axios
      .get(`https://ss-backend-sage.vercel.app/api/${type}/${id}`)
      .then((res) => {
        setProduct(res.data);
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
        <h3 className="text-lg font-semibold text-yellow-900 mb-3 ml-2">
          {title}
        </h3>

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
                  href={to}
                  key={item._id}
                  className="min-w-[180px] bg-white rounded-lg shadow p-3 flex flex-col items-center"
                >
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded mb-2"
                  />
                  <div className="font-medium truncate text-center w-full">
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
                className="min-w-[180px] h-[232px] flex items-center justify-center border-2 border-dashed border-[#670E33]"
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
        <Link to="/allproducts" className="text-yellow-900">
          ← Back
        </Link>

        <div className="bg-white rounded-lg shadow p-6 mt-4 flex flex-col items-center">
          <img
            src={selectedImg}
            alt={product.name}
            className="w-80 h-80 object-cover rounded mb-4 cursor-pointer"
            onClick={() => setModalImg(selectedImg)}
          />

          <div className="grid grid-cols-4 gap-3 mb-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  selectedImgIdx === idx
                    ? "ring-2 ring-yellow-900"
                    : "opacity-70"
                }`}
                onClick={() => setSelectedImgIdx(idx)}
              />
            ))}
          </div>

          <h1 className="text-2xl font-bold text-yellow-900">
            {product.name}
          </h1>
          <p className="text-gray-500 text-center">{product.description}</p>
          <div className="text-xl font-bold text-yellow-900 mt-2">
            ₹{product.price}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded"
          >
            Order on WhatsApp
          </a>
        </div>

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
