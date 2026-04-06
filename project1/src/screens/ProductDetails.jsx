import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  let { id } = useParams();
  let [productDetail, setProductDetail] = useState({});
  let [activeImg, setActiveImg] = useState("");
  const { addToCart } = useAuth();

  let getSingleProductDetail = async () => {
    try {
      let res = await axiosInstance.get(`/products/${id}`);
      setProductDetail(res.data);
      setActiveImg(res.data.thumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) getSingleProductDetail();
  }, [id]);

  if (!productDetail.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0000] via-black to-[#2b0000] text-white">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-[#800000] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0000] via-black to-[#2b0000] text-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-[#800000]/30 rounded-3xl p-4 shadow-xl">
            <img
              src={activeImg}
              alt=""
              className="w-full h-[400px] object-contain rounded-2xl transition duration-500 hover:scale-105"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {productDetail.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`h-20 w-20 object-cover rounded-xl cursor-pointer border transition ${
                  activeImg === img
                    ? "border-[#800000] scale-105"
                    : "border-white/10"
                } hover:scale-105`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#a52a2a]">
              {productDetail.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight bg-gradient-to-r from-[#800000] to-[#ff4d4d] bg-clip-text text-transparent">
              {productDetail.title}
            </h1>
            <p className="text-gray-400 mt-2">{productDetail.brand}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400 text-lg">★★★★★</div>
            <span className="text-gray-400 text-sm">{productDetail.rating}</span>
          </div>

          <div className="bg-white/5 border border-[#800000]/30 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-[#ff4d4d]">${productDetail.price}</span>
              {productDetail.discountPercentage > 0 && (
                <span className="text-gray-500 line-through text-lg">
                  ${Math.round(productDetail.price / (1 - productDetail.discountPercentage / 100))}
                </span>
              )}
            </div>
            <p className="text-green-400 text-sm mt-1">
              {productDetail.discountPercentage?.toFixed(1)}% OFF
            </p>
          </div>

          <div className="bg-white/5 border border-[#800000]/30 rounded-xl px-4 py-3 text-sm shadow-md">
            {productDetail.stock > 0 ? (
              <span className="text-green-400">In Stock • {productDetail.stock} left</span>
            ) : (
              <span className="text-red-400">Out of Stock</span>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(productDetail)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#800000] to-[#b30000] font-semibold hover:scale-105 hover:shadow-lg transition"
            >
              Add to Cart
            </button>
            <button className="flex-1 py-3 rounded-xl bg-white/10 border border-[#800000]/40 hover:bg-[#800000]/20 transition">
              Buy Now
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 bg-white/5 border border-[#800000]/30 rounded-2xl p-4">
            <div><p className="text-gray-500">Brand</p><p>{productDetail.brand}</p></div>
            <div><p className="text-gray-500">SKU</p><p>{productDetail.sku}</p></div>
            <div><p className="text-gray-500">Weight</p><p>{productDetail.weight}g</p></div>
            <div><p className="text-gray-500">Warranty</p><p>{productDetail.warrantyInformation}</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 bg-white/5 border border-[#800000]/30 rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#ff4d4d]">Description</h2>
        <p className="text-gray-300 leading-relaxed">{productDetail.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;