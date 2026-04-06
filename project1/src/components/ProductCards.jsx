import React from "react";
import { useNavigate } from "react-router";

const ProductCards = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/detail/${products?.id}`)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-350
        bg-white/[0.03] border border-[#b41e1e]/15 hover:border-[#b41e1e]/50 hover:-translate-y-1"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="h-52 flex items-center justify-center bg-black/20 relative overflow-hidden">
        <span className="absolute top-3 left-3 text-[9px] font-semibold tracking-[0.2em] uppercase
          px-2.5 py-1 bg-[#cc2222]/10 border border-[#cc2222]/25 rounded text-[#cc4444]">
          {products?.category}
        </span>
        <img
          src={products?.thumbnail}
          alt={products?.title}
          className="h-36 object-contain transition-transform duration-400 group-hover:scale-[1.08]"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <h2
          className="text-[17px] font-semibold leading-snug mb-1 text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {products?.title}
        </h2>
        <p className="text-[10px] tracking-[0.12em] uppercase text-white/30 mb-4">
          {products?.brand}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-semibold text-white">${products?.price}</span>
            {products?.discountPercentage > 0 && (
              <span className="text-[11px] text-white/25 line-through ml-2">
                ${Math.round(products.price / (1 - products.discountPercentage / 100))}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); /* add to cart logic */ }}
            className="relative overflow-hidden text-[9px] font-semibold tracking-[0.2em] uppercase
              px-4 py-2 border border-[#cc2222]/50 text-[#cc4444] transition-all duration-300
              group-hover:text-white group-hover:border-[#cc2222]"
          >
            <span className="absolute inset-0 bg-[#cc2222] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;